import io
from minio import Minio
from datetime import timedelta
import os

ALLOWED_EXTENSIONS = {"txt", "pdf", "png", "jpg", "jpeg", "gif"}
ACCESS_KEY = os.environ.get("MINIO_ROOT_USER")
SECRET_KEY = os.environ.get("MINIO_ROOT_PASSWORD")
BUCKET_NAME = os.environ.get("MINIO_BUCKET")
MINIO_API_HOST = f"{os.environ.get('MINIO_HOSTNAME')}:{os.environ.get('MINIO_SERVER_PORT')}" # os.environ.get("MINIO_ENDPOINT")

def upload_object(filename, data, length):
    client = Minio(MINIO_API_HOST, ACCESS_KEY, SECRET_KEY, secure=False)

    # Make bucket if not exist.
    found = client.bucket_exists(BUCKET_NAME)
    if not found:
        client.make_bucket(BUCKET_NAME)
        print(f"Bucket {BUCKET_NAME} created successfully")
    else:
        print(f"Bucket {BUCKET_NAME} already exists")

    try:
        # Upload file to MinIO bucket
        client.put_object(BUCKET_NAME, filename, data, length)
        print(f"{filename} is successfully uploaded to bucket {BUCKET_NAME}.")
    except Exception as e:
        print(f"Error uploading {filename} to bucket {BUCKET_NAME}: {e}")

def presigned(filename):
    client = Minio(MINIO_API_HOST, ACCESS_KEY, SECRET_KEY, secure=False)
    image_url = client.get_presigned_url("GET", BUCKET_NAME, 
                                    filename,
                                    expires=timedelta(days=7))
    return image_url
    
def generate_url(filename):
    if filename:
        return presigned(filename)
    else:
        return None

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS