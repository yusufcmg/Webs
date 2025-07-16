from sqlalchemy import Column, Integer, String, JSON
from .database import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    tech = Column(JSON)
    gradient = Column(String)
    github_url = Column(String, nullable=True)

class ContactMessageModel(Base): # Yeni model: İletişim mesajlarını saklamak için
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String)
    message = Column(String)