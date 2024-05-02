from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from files import upload_object, allowed_file, generate_url
from flasgger import Swagger
from database import db_config
import jwt
from datetime import datetime, timedelta
from werkzeug.security import check_password_hash, generate_password_hash
from sqlalchemy.exc import IntegrityError
import os
import requests
from slugify import slugify

## APP Init
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])
api = Api(app)
swagger = Swagger(app)
db = SQLAlchemy()

app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://{db_config['user']}:{db_config['password']}@{db_config['host']}/{db_config['name']}"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret'

db.init_app(app)

## Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)

    @classmethod
    def create_admin_user(cls):
        # Check if admin user already exists
        admin_user = cls.query.filter_by(username='admin').first()
        
        if not admin_user:
            admin_password = generate_password_hash('admin')
            admin_user = cls(username='admin', password=admin_password)
            db.session.add(admin_user)
            db.session.commit()
            print("Admin user created successfully")
        else:
            print("Admin user already exists")

class Program(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False, unique=True)
    deskripsi = db.Column(db.String(500), nullable=True)
    gambar = db.Column(db.String(200), nullable=True)
    tanggal = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    sub_programs = db.relationship('SubProgram', backref='program', lazy=True)

class SubProgram(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(100), nullable=False, unique=True)
    deskripsi = db.Column(db.String(500), nullable=True)
    gambar = db.Column(db.String(200), nullable=True)
    tanggal = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Added tanggal attribute
    program_id = db.Column(db.Integer, db.ForeignKey('program.id'), nullable=False)

class Artikel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    judul = db.Column(db.String(200), nullable=False, unique=True)
    konten = db.Column(db.Text, nullable=True)
    gambar = db.Column(db.String(200), nullable=True)
    tanggal = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Added tanggal attribute


## API
class ProgramResource(Resource):
    def get(self, program_id=None):
        """
        Get program(s) by ID or get all programs
        ---
        tags:
        - Program
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: program_id
            in: path
            type: integer
            required: false
        responses:
          200:
            description: Program details or list of all programs
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        if program_id is not None:
            program = Program.query.get(program_id)
            if program:
                # Generate full URL for the image
                gambar_url = f"{os.getenv('APP_BASE_URL')}/files/{program.gambar}"

                return {
                    "id": program.id,
                    "nama": program.nama,
                    "deskripsi": program.deskripsi,
                    "tanggal": program.tanggal.strftime('%Y-%m-%d %H:%M:%S'),
                    "gambar": gambar_url  # Include the full URL for the image
                }
            else:
                return {"message": "Program not found"}, 404
        else:
            programs = Program.query.all()
            programs_list = [{
                "id": program.id,
                "nama": program.nama,
                "deskripsi": program.deskripsi,
                "tanggal": program.tanggal.strftime('%Y-%m-%d %H:%M:%S'),
                "gambar": f"{os.getenv('APP_BASE_URL')}/files/{program.gambar}"  # Include the full URL for each image
            } for program in programs]
            return programs_list

    def post(self):
        """
        Create a new program
        ---
        tags:
        - Program
        consumes:
        - multipart/form-data
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: nama
            in: formData
            type: string
            required: true
          - name: deskripsi
            in: formData
            type: string
          - name: gambar
            in: formData
            type: file
        responses:
          201:
            description: Program created successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        data = request.form
        nama = data.get('nama')
        deskripsi = data.get('deskripsi')
        gambar_file = request.files.get('gambar')

        if not nama:
            return {"message": "Nama is required"}, 400

        if gambar_file and allowed_file(gambar_file.filename):
            gambar_filename = f"{slugify(nama)}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
            gambar_data = gambar_file
            size = os.fstat(gambar_data.fileno()).st_size
            upload_object(gambar_filename, gambar_data, size)
        else:
            return {"message": "Invalid file format"}, 400

        tanggal = datetime.utcnow()  # Get the current datetime
        new_program = Program(nama=nama, deskripsi=deskripsi, gambar=gambar_filename, tanggal=tanggal)
        db.session.add(new_program)
        db.session.commit()

        return {"message": "Program created successfully", "id": new_program.id}, 201

    def put(self, program_id):
        """
        Update a program by ID
        ---
        tags:
        - Program
        consumes:
        - multipart/form-data
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: program_id
            in: path
            type: integer
            required: true
          - name: body
            in: body
            required: true
            schema:
              id: UpdateProgram
              properties:
                nama:
                  type: string
                deskripsi:
                  type: string
                gambar:
                  type: file
        responses:
          200:
            description: Program updated successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        program = Program.query.get(program_id)
        if program:
          data = request.form
          program.nama = data.get('nama', program.nama)
          program.deskripsi = data.get('deskripsi', program.deskripsi)

          gambar_file = request.files.get('gambar')
          if gambar_file and allowed_file(gambar_file.filename):
              gambar_filename = f"{slugify(program.nama)}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
              gambar_data = gambar_file
              size = os.fstat(gambar_file.fileno()).st_size
              upload_object(gambar_filename, gambar_data, size)
              program.gambar = gambar_filename

          db.session.commit()
          return {"message": "Program updated successfully", "id": program.id}
        else:
            return {"message": "Program not found"}, 404

    def delete(self, program_id):
        """
        Delete a program by ID
        ---
        tags:
        - Program
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: program_id
            in: path
            type: integer
            required: true
        responses:
          200:
            description: Program deleted successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({"message": "Invalid token"}), 401

        program = Program.query.get(program_id)
        if program:
            db.session.delete(program)
            db.session.commit()
            return jsonify({"message": "Program deleted successfully", "id": program_id})
        else:
            return jsonify({"message": "Program not found"}), 404

class SubProgramResource(Resource):
    
    def get(self, sub_program_id=None):
        """
        Get sub_program(s) by ID or get all sub_programs
        ---
        tags:
        - SubProgram
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: sub_program_id
            in: path
            type: integer
            required: false
        responses:
          200:
            description: SubProgram details or list of all sub_programs
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        if sub_program_id is not None:
            sub_program = SubProgram.query.get(sub_program_id)

            if sub_program:
                return {
                  "id": sub_program.id,
                  "nama": sub_program.nama,
                  "deskripsi": sub_program.deskripsi,
                  "program_id": sub_program.program_id,
                  "gambar": f"{os.getenv('APP_BASE_URL')}/files/{sub_program.gambar}"
                  }
            else:
                return {"message": "SubProgram not found"}, 404
        else:
            sub_programs = SubProgram.query.all()
            sub_programs_list = [{
              "id": sub_program.id,
              "nama": sub_program.nama,
              "deskripsi": sub_program.deskripsi,
              "program_id": sub_program.program_id,
              "gambar": f"{os.getenv('APP_BASE_URL')}/files/{sub_program.gambar}"
            } for sub_program in sub_programs]
            return sub_programs_list

    def post(self):
        """
        Create a new sub_program
        ---
        tags:
        - SubProgram
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: body
            in: body
            required: true
            schema:
              id: NewSubProgram
              properties:
                nama:
                  type: string
                tanggal:
                  type: string
                  format: date-time
                  example: "2024-03-29 14:30:00"
                program_id:
                  type: integer
        responses:
          201:
            description: SubProgram created successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        data = request.form
        nama = data.get('nama')
        deskripsi = data.get('deskripsi')
        tanggal = datetime.utcnow()
        gambar_file = request.files.get('gambar')
        program_id = data.get('program_id')

        if not nama or not program_id:
            return {"message": "Nama and program_id are required"}, 400

        if gambar_file and allowed_file(gambar_file.filename):
            gambar_filename = f"{nama}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
            gambar_data = gambar_file
            size = os.fstat(gambar_data.fileno()).st_size
            upload_object(gambar_filename, gambar_data, size)
        else:
            return {"message": "Invalid file format"}, 400

        new_sub_program = SubProgram(nama=nama, deskripsi=deskripsi, gambar=gambar_filename, tanggal=tanggal, program_id=program_id)
        db.session.add(new_sub_program)
        db.session.commit()

        return {"message": "SubProgram created successfully", "id": new_sub_program.id}, 201

    def put(self, sub_program_id):
        """
        Update a sub_program by ID
        ---
        tags:
        - SubProgram
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: sub_program_id
            in: path
            type: integer
            required: true
          - name: body
            in: body
            required: true
            schema:
              id: UpdateSubProgram
              properties:
                nama:
                  type: string
                program_id:
                  type: integer
        responses:
          200:
            description: SubProgram updated successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401
        
        sub_program = SubProgram.query.get(sub_program_id)
        if sub_program:
            data = request.form
            sub_program.nama = data.get('nama', sub_program.nama)
            sub_program.deskripsi = data.get('deskripsi', sub_program.deskripsi)
            sub_program.tanggal = data.get('tanggal', sub_program.tanggal)
            sub_program.program_id = data.get('program_id', sub_program.program_id)

            gambar_file = request.files.get('gambar')
            if gambar_file and allowed_file(gambar_file.filename):
                gambar_filename = f"{sub_program.nama}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
                gambar_data = gambar_file
                size = os.fstat(gambar_file.fileno()).st_size
                upload_object(gambar_filename, gambar_data, size)
                sub_program.gambar = gambar_filename

            db.session.commit()
            return {"message": "SubProgram updated successfully", "id": sub_program.id}
        else:
            return {"message": "SubProgram not found"}, 404

    def delete(self, sub_program_id):
        """
        Delete a sub_program by ID
        ---
        tags:
        - SubProgram
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: sub_program_id
            in: path
            type: integer
            required: true
        responses:
          200:
            description: SubProgram deleted successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        sub_program = SubProgram.query.get(sub_program_id)
        if sub_program:
            db.session.delete(sub_program)
            db.session.commit()
            return {"message": "SubProgram deleted successfully", "id": sub_program_id}
        else:
            return {"message": "SubProgram not found"}, 404

class ArtikelResource(Resource):    
    def get(self, artikel_id=None):
        """
        Get artikel(s) by ID or get all artikels
        ---
        tags:
        - Artikel
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: artikel_id
            in: path
            type: integer
            required: false
        responses:
          200:
            description: Artikel details or list of all artikels
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        if artikel_id is not None:
            
            artikel = Artikel.query.get(artikel_id)
            if artikel:
                gambar_url = f"{os.getenv('APP_BASE_URL')}/files/{artikel.gambar}"
                return {
                    "id": artikel.id, 
                    "judul": artikel.judul,
                    "konten": artikel.konten,
                    "gambar": gambar_url,
                    "tanggal": artikel.tanggal.strftime('%Y-%m-%d %H:%M:%S')
                }
            else:
                return {"message": "Artikel not found"}, 404
        else:
            artikels = Artikel.query.order_by(Artikel.tanggal.desc()).all()
            artikels_list = [{
                "id": artikel.id, 
                "judul": artikel.judul,
                "konten": artikel.konten,
                "gambar": f"{os.getenv('APP_BASE_URL')}/files/{artikel.gambar}",
                "tanggal": artikel.tanggal.strftime('%Y-%m-%d %H:%M:%S')
            } for artikel in artikels]
            return artikels_list

    def post(self):
        """
        Create a new artikel
        ---
        tags:
        - Artikel
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: body
            in: body
            required: true
            schema:
              id: NewArtikel
              properties:
                judul:
                  type: string
                konten:
                  type: string
                gambar:
                  type: string
        responses:
          201:
            description: Artikel created successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        data = request.form
        judul = data.get('judul')
        konten = data.get('konten')
        gambar_file = request.files.get('gambar')

        if not judul:
            return {"message": "Judul is required"}, 400

        if gambar_file and allowed_file(gambar_file.filename):
            gambar_filename = f"{slugify(judul)}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
            gambar_data = gambar_file
            size = os.fstat(gambar_data.fileno()).st_size
            upload_object(gambar_filename, gambar_data, size)
        else:
            return {"message": "Invalid file format"}, 400

        new_artikel = Artikel(judul=judul, konten=konten, gambar=gambar_filename)
        db.session.add(new_artikel)
        db.session.commit()

        return {"message": "Artikel created successfully", "id": new_artikel.id}, 201

    def put(self, artikel_id):
        """
        Update an artikel by ID
        ---
        tags:
        - Artikel
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: artikel_id
            in: path
            type: integer
            required: true
          - name: body
            in: body
            required: true
            schema:
              id: UpdateArtikel
              properties:
                judul:
                  type: string
                konten:
                  type: string
                gambar:
                  type: string
        responses:
          200:
            description: Artikel updated successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        artikel = Artikel.query.get(artikel_id)
        if artikel:
            data = request.form
            artikel.judul = data.get('judul', artikel.judul)
            artikel.konten = data.get('konten', artikel.konten)
            artikel.gambar = data.get('gambar', artikel.gambar)

            gambar_file = request.files.get('gambar')
            if gambar_file and allowed_file(gambar_file.filename):
                gambar_filename = f"{slugify(artikel.judul)}_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}.jpg"
                gambar_data = gambar_file
                size = os.fstat(gambar_file.fileno()).st_size
                upload_object(gambar_filename, gambar_data, size)
                artikel.gambar = gambar_filename

            db.session.commit()
            return {"message": "Artikel updated successfully", "id": artikel.id}
        else:
            return {"message": "Artikel not found"}, 404

    def delete(self, artikel_id):
        """
        Delete an artikel by ID
        ---
        tags:
        - Artikel
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: artikel_id
            in: path
            type: integer
            required: true
        responses:
          200:
            description: Artikel deleted successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({"message": "Invalid token"}), 401

        artikel = Artikel.query.get(artikel_id)
        if artikel:
            db.session.delete(artikel)
            db.session.commit()
            return jsonify({"message": "Artikel deleted successfully", "id": artikel_id})
        else:
            return jsonify({"message": "Artikel not found"}), 404

class UserResource(Resource):
    def get(self, user_id=None):
        """
        Get user(s) by ID or get all users
        ---
        tags:
        - User
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: user_id
            in: path
            type: integer
            required: false
        responses:
          200:
            description: User details or list of all users
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        if user_id is not None:
            user = User.query.get(user_id)
            if user:
                return {
                    "id": user.id,
                    "username": user.username,
                    # Exclude password from response for security reasons
                }
            else:
                return {"message": "User not found"}, 404
        else:
            users = User.query.all()
            users_list = [{
                "id": user.id,
                "username": user.username,
                # Exclude password from response for security reasons
            } for user in users]
            return users_list

    
    def post(self):
        """
        Create a new user
        ---
        tags:
        - User
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: body
            in: body
            required: true
            schema:
              id: CreateUser
              properties:
                username:
                  type: string
                password:
                  type: string
        responses:
          201:
            description: User created successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username:
            return {"message": "Username is required"}, 400

        if not password:
            return {"message": "Password is required"}, 400

        # Check if the username is already taken
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"message": "Username already exists"}, 400

        # Hash the password
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User created successfully", "id": new_user.id}, 201

    def put(self, user_id):
        """
        Update a user by ID
        ---
        tags:
        - User
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: user_id
            in: path
            type: integer
            required: true
          - name: body
            in: body
            required: true
            schema:
              id: UpdateUser
              properties:
                password:
                  type: string
        responses:
          200:
            description: User updated successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return {"message": "Token is missing"}, 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return {"message": "Invalid token"}, 401

        user = User.query.get(user_id)
        if user:
            data = request.json
            password = data.get('password')

            if not password:
                return {"message": "Password is required"}, 400
            
            # Hash the new password
            hashed_password = generate_password_hash(password)
            user.password = hashed_password
            db.session.commit()
            return {"message": "User password updated successfully", "id": user.id}
        else:
            return {"message": "User not found"}, 404

    def delete(self, user_id):
        """
        Delete a user by ID
        ---
        tags:
        - User
        parameters:
          - name: Authorization
            in: header
            type: string
            required: true
            value: "Bearer "
          - name: user_id
            in: path
            type: integer
            required: true
        responses:
          200:
            description: User deleted successfully
        """
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        
        try:
            data = jwt.decode(token.split(" ")[1], app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({"message": "Invalid token"}), 401

        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"message": "User deleted successfully", "id": user_id})
        else:
            return jsonify({"message": "User not found"}), 404


class Auth(Resource):
    def post(self):
        """
        Verify login credentials and generate JWT token
        ---
        tags:
        - Auth
        parameters:
          - name: body
            in: body
            required: true
            schema:
              id: Auth
              properties:
                username:
                  type: string
                password:
                  type: string
        responses:
          200:
            description: Token generated successfully
        """
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {"message": "Username and password are required"}, 400

        user = User.query.filter_by(username=username).first()
        if not user or not check_password_hash(user.password, password):
            return {"message": "Invalid credentials"}, 401

        token = jwt.encode({
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, app.config['SECRET_KEY'], algorithm="HS256")

        return {"success": True, "token": token}

class PublicResource(Resource):
    
    def get_program_navbar(self):
        programs = Program.query.all()
        navbar_data = []

        for program in programs:
            sub_programs = SubProgram.query.filter_by(program_id=program.id).all()
            sub_program_names = [sub.nama for sub in sub_programs]

            program_data = {
                "id": program.id,
                "name": program.nama,
                "sub_programs": sub_program_names,
            }
            navbar_data.append(program_data)

        # Return the navbar data as the API response
        return navbar_data
    
    def get_program_list(self):
      # Fetch program list data
      programs = Program.query.all()
      program_list_data = []

      for program in programs:
          sub_programs = SubProgram.query.filter_by(program_id=program.id).all()
          sub_program_data = []

          for sub_program in sub_programs:
              sub_program_data.append({
                  "id": sub_program.id,
                  "nama": sub_program.nama,
                  "deskripsi": sub_program.deskripsi,
                  "tanggal": sub_program.tanggal.strftime('%Y-%m-%d %H:%M:%S'),
                  "gambar": f"{os.getenv('APP_BASE_URL')}/files/{sub_program.gambar}",
              })

          program_data = {
              "id": program.id,
              "nama": program.nama,
              "deskripsi": program.deskripsi,
              "tanggal": program.tanggal.strftime('%Y-%m-%d %H:%M:%S'),
              "gambar": f"{os.getenv('APP_BASE_URL')}/files/{program.gambar}",
              "sub_programs": sub_program_data,
          }
          program_list_data.append(program_data)

      # Return the program list data as the API response
      return program_list_data
    
    def get_article(self):
        # New 'get_article' method logic for '/public/article'
        # Fetch article data (assuming it's a list of article details)
        articles = Artikel.query.all()  # Replace 'Artikel' with the actual model class
        articles_list = [{
            "id": article.id,
            "title": article.judul,  # Assuming 'judul' is the title field for Artikel
            "content": article.konten,  # Assuming 'konten' is the content field for Artikel
            "date": article.tanggal.strftime('%Y-%m-%d %H:%M:%S'),
            "image": f"{os.getenv('APP_BASE_URL')}/files/{article.gambar}"  # Adjust the path as needed
        } for article in articles]
        
        # Return the article data as the API response
        return articles_list

    def get(self, endpoint_name):
        if endpoint_name == 'program_navbar':
            return self.get_program_navbar()
        elif endpoint_name == 'program_list':
            return self.get_program_list()
        elif endpoint_name == 'article':
            return self.get_article()
        else:
            return {"message": "Invalid endpoint"}, 404

api.add_resource(ProgramResource, '/program', '/program/<int:program_id>')
api.add_resource(SubProgramResource, '/sub-program', '/sub-program/<int:sub_program_id>')
api.add_resource(ArtikelResource, '/artikel', '/artikel/<int:artikel_id>')
api.add_resource(UserResource, '/user', '/user/<int:user_id>')
api.add_resource(Auth, '/auth')
api.add_resource(PublicResource, '/public/<string:endpoint_name>')

## Controller
@app.route('/files/<name>', methods=['GET'])
def show_files(name):
    print(name)
    r = requests.get(generate_url(name), stream=True)  # it needs `stream=True`
    
    file_like_object = r.raw

    filetype = ""
    if name.split(".")[1] == "jpg":
      filetype = "image/jpeg"
    elif name.split(".")[1] == "png":
      filetype = "image/png"
    
    return send_file(file_like_object, mimetype=filetype)

## APP Serve
if __name__ == '__main__':
    with app.app_context():
        db.create_all()

        # Create admin user if not exists
        User.create_admin_user()

    app.run(debug=True, host='0.0.0.0')

