import json
from pathlib import Path
# Import necessary components from the briefs router
from briefs_router import _read_brief, ProductBrief

def load_context(file_path):
    """Loads JSON context from instruction or system role files."""
    # This function remains for loading instructions and system roles
    try:
        return json.loads(Path(file_path).read_text(encoding="utf-8"))
    except FileNotFoundError:
        print(f"🔥 Error: Context file not found at {file_path}")
        raise
    except json.JSONDecodeError:
        print(f"🔥 Error: Could not decode JSON from {file_path}")
        raise
    except Exception as e:
        print(f"🔥 Error loading context from {file_path}: {e}")
        raise


def build_prompt(brief_id: str, task: str):
    print(f"📦 Loading prompt for brief_id={brief_id}, task={task}")
    base_path = Path("contexts") # Still needed for instructions/roles
    instructions_path = base_path / "instructions" / f"{task}.json"

    # --- Load Product Brief Dynamically ---
    print(f"🔍 Loading dynamic brief: {brief_id}")
    product_brief_obj = _read_brief(brief_id)
    if product_brief_obj is None:
        print(f"🔥 Error: Product brief '{brief_id}' not found in contexts/product_briefs/")
        raise FileNotFoundError(f"Product brief '{brief_id}' not found.")
    # Convert Pydantic model to dict for JSON serialization later
    product_brief_dict = product_brief_obj.model_dump()

    # --- Load Instructions and System Role (Static for now) ---
    print(f"🔍 Loading static instruction: {instructions_path}")
    instructions = load_context(instructions_path)
    system_role_path = base_path / "system_roles" / f"{instructions['system']}.json"
    print(f"🔍 Loading static system role: {system_role_path}")
    system = load_context(system_role_path)

    # --- Assemble Prompt ---
    return [
        {"role": "system", "content": system["content"]},
        {"role": "user", "content": f"{instructions['content']}\n\nProduct Brief:\n{json.dumps(product_brief_dict, indent=2)}"}
    ]
