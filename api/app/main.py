from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import APIKeyHeader
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import os

from dotenv import load_dotenv # Yeni: dotenv kütüphanesini import ettik

load_dotenv() # Yeni: .env dosyasını yüklüyoruz.

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS ayarları
origins = [
    "http://localhost:8080",
    "http://localhost:5173",
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- API Anahtarı Güvenliği (Yeni) ---
API_KEY_NAME = "X-API-Key" # API anahtarının bulunacağı HTTP başlığı
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=True)

async def get_api_key(api_key: str = Depends(api_key_header)):
    # Ortam değişkeninden API anahtarını alıyoruz ve .strip() ile boşlukları temizliyoruz
    stored_api_key = os.getenv("API_KEY", "your-fallback-api-key-here-!!!").strip() # .strip() eklendi

    # DEBUG çıktısını kaldırabilirsiniz (sorun çözüldüğünde)
    print(f"DEBUG: FastAPI tarafından okunan API_KEY (strip sonrası): '{stored_api_key}'")

    if api_key != stored_api_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key",
        )
    return api_key

# --- Post Uç Noktaları ---
@app.post("/api/posts/", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    return crud.create_post(db=db, post=post)

@app.get("/api/posts/", response_model=list[schemas.Post])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Bu endpoint herkese açık kalır (sadece okuma).
    posts = crud.get_posts(db, skip=skip, limit=limit)
    return posts

@app.get("/api/posts/{post_id}", response_model=schemas.Post)
def read_post(post_id: int, db: Session = Depends(get_db)):
    # Bu endpoint de herkese açık kalır.
    db_post = crud.get_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.put("/api/posts/{post_id}", response_model=schemas.Post)
def update_post_api(post_id: int, post: schemas.PostUpdate, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    db_post = crud.update_post(db, post_id=post_id, post=post)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@app.delete("/api/posts/{post_id}")
def delete_post_api(post_id: int, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    db_post = crud.delete_post(db, post_id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}

# --- Project Uç Noktaları ---
@app.post("/api/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    return crud.create_project(db=db, project=project)

@app.get("/api/projects/", response_model=list[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Bu endpoint de herkese açık kalır.
    projects = crud.get_projects(db, skip=skip, limit=limit)
    return projects

@app.get("/api/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    # Bu endpoint de herkese açık kalır.
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.put("/api/projects/{project_id}", response_model=schemas.Project)
def update_project_api(project_id: int, project: schemas.ProjectUpdate, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    db_project = crud.update_project(db, project_id=project_id, project=project)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.delete("/api/projects/{project_id}")
def delete_project_api(project_id: int, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    db_project = crud.delete_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"}

# --- Contact Mesajı Uç Noktaları ---
@app.post("/api/contact/", status_code=200)
def submit_contact_form(message: schemas.ContactMessage, db: Session = Depends(get_db)):
    # Bu endpoint herkese açık kalır, çünkü ziyaretçilerin mesaj gönderebilmesi gerekir.
    crud.create_contact_message(db, message=message)
    return {"status": "success", "message": "Mesajınız başarıyla kaydedildi."}

@app.get("/api/contact_messages/", response_model=list[schemas.ContactMessage])
def read_contact_messages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), api_key: str = Depends(get_api_key)): # API Anahtarı koruması eklendi
    # Mesajları görmek için API Anahtarı gerekir
    messages = crud.get_contact_messages(db, skip=skip, limit=limit)
    return messages