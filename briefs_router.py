import json
import uuid
from pathlib import Path
from typing import List, Optional

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field

# --- Constants ---
BRIEFS_DIR = Path("contexts/product_briefs")

# Ensure data directories exist
BRIEFS_DIR.mkdir(parents=True, exist_ok=True)

# --- Pydantic Models ---

class ProductBriefInput(BaseModel):
    """Model for creating/updating a brief (ID is generated/implicit)"""
    title: str
    problem: str
    goals: List[str]
    target_users: List[str]
    key_features: List[str]
    constraints: List[str] = [] # Optional field

class ProductBrief(ProductBriefInput):
    """Model representing a full brief, including its ID"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# --- API Router ---
router = APIRouter(
    prefix="/api/briefs",
    tags=["briefs"],
)

# --- Helper Functions ---

def _get_brief_path(brief_id: str) -> Path:
    """Constructs the path to a brief file."""
    return BRIEFS_DIR / f"{brief_id}.json"

def _read_brief(brief_id: str) -> Optional[ProductBrief]:
    """Reads and parses a brief file."""
    file_path = _get_brief_path(brief_id)
    print(f"Attempting to read brief from: {file_path}") # Log file path
    if not file_path.is_file():
        print(f"File not found: {file_path}") # Log if file is not found
        return None
    try:
        brief_data = json.loads(file_path.read_text(encoding="utf-8"))
        print(f"Successfully read brief data: {brief_data}") # Log parsed data
        return ProductBrief(**brief_data)
    except (json.JSONDecodeError, IOError) as e:
        print(f"Error reading brief {brief_id}: {e}") # Add basic logging
        return None # Or raise an internal server error? For now, treat as not found

def _write_brief(brief: ProductBrief) -> None:
    """Writes a brief object to its JSON file."""
    file_path = _get_brief_path(brief.id)
    try:
        file_path.write_text(brief.model_dump_json(indent=2), encoding="utf-8")
    except IOError as e:
        print(f"Error writing brief {brief.id}: {e}")
        # Consider raising an internal server error if write fails
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not save brief")


# --- API Endpoints ---

@router.post("/", response_model=ProductBrief, status_code=status.HTTP_201_CREATED)
async def create_brief(brief_input: ProductBriefInput):
    """
    Creates a new product brief and saves it to a JSON file.
    A unique ID is automatically generated.
    """
    new_brief = ProductBrief(**brief_input.model_dump())
    _write_brief(new_brief) # This handles potential write errors
    return new_brief

@router.get("/", response_model=List[ProductBrief])
async def list_briefs():
    """
    Lists all available product briefs by reading from the data directory.
    """
    briefs = []
    for file_path in BRIEFS_DIR.glob("*.json"):
        brief_id = file_path.name # Use the full filename as the brief ID
        brief = _read_brief(brief_id)
        if brief:
            briefs.append(brief)
        else:
            # Log or handle cases where a file exists but couldn't be read
            print(f"Warning: Could not read or parse brief file: {file_path}")
    return briefs

@router.get("/{brief_id}", response_model=ProductBrief)
async def get_brief(brief_id: str):
    """
    Retrieves a specific product brief by its ID.
    """
    brief = _read_brief(brief_id)
    if brief is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brief not found")
    return brief

@router.put("/{brief_id}", response_model=ProductBrief)
async def update_brief(brief_id: str, brief_input: ProductBriefInput):
    """
    Updates an existing product brief.
    """
    existing_brief = _read_brief(brief_id)
    if existing_brief is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brief not found")

    # Create an updated brief object, keeping the original ID
    updated_brief = ProductBrief(id=brief_id, **brief_input.model_dump())
    _write_brief(updated_brief)
    return updated_brief

@router.delete("/{brief_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_brief(brief_id: str):
    """
    Deletes a product brief by its ID.
    """
    file_path = _get_brief_path(brief_id)
    if not file_path.is_file():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Brief not found")
    try:
        file_path.unlink() # Delete the file
    except IOError as e:
        print(f"Error deleting brief {brief_id}: {e}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not delete brief")
    # No content to return on successful deletion