from pydantic import BaseModel
from typing import List

class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int

    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    title: str
    description: str
    tech: List[str]
    gradient: str

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int

    class Config:
        orm_mode = True
