from pydantic import BaseModel
from typing import List, Optional

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None

class Post(PostBase):
    id: int

    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    title: str
    description: str
    tech: List[str]
    gradient: str
    github_url: Optional[str] = None # Yeni: GitHub URL'si eklendi

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tech: Optional[List[str]] = None
    gradient: Optional[str] = None
    github_url: Optional[str] = None # Yeni: GitHub URL'si güncelleme için eklendi

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str