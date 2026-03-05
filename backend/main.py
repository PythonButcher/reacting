from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS so your React app (on http://localhost:5173) can talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Default Vite port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello from the Python backend!"}

@app.get("/api/data")
async def get_data():
    return {
        "id": 1,
        "name": "Project Dashboard",
        "status": "Online",
        "details": "This data is coming directly from your FastAPI backend."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
