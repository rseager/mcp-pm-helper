import json
from pathlib import Path

def load_context(file_path):
    return json.loads(Path(file_path).read_text(encoding="utf-8"))

def build_prompt(brief_id: str, task: str):
    print(f"📦 Loading prompt for brief_id={brief_id}, task={task}")
    base_path = Path("contexts")
    product_brief_path = base_path / "product_briefs" / f"{brief_id}.json"
    instructions_path = base_path / "instructions" / f"{task}.json"

    print(f"🔍 Looking for: {product_brief_path} and {instructions_path}")

    product_brief = load_context(product_brief_path)
    instructions = load_context(instructions_path)
    system = load_context(base_path / "system_roles" / f"{instructions['system']}.json")

    return [
        {"role": "system", "content": system["content"]},
        {"role": "user", "content": f"{instructions['content']}\n\nProduct Brief:\n{json.dumps(product_brief, indent=2)}"}
    ]
