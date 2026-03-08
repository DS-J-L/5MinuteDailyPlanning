# System Architecture

## Overview
웹 기반 개인 생산성 앱

Frontend와 Backend를 분리한다.

## Tech Stack

Frontend
- React
- TypeScript
- Vite
- TailwindCSS

Backend
- FastAPI
- SQLAlchemy

Database
- SQLite

## Architecture

Browser
↓
React Frontend
↓
REST API
↓
FastAPI Backend
↓
SQLite Database

## Key Principles

- 단순한 구조 유지
- REST API 기반
- 단일 사용자 기준 MVP
- 확장 가능 구조

## Folder Structure

project/

frontend/
React application

backend/
FastAPI server

docs/
project documentation