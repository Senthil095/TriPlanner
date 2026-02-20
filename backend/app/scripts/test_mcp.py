
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '../../'))

async def run():
    print("Testing MCP Server...")
    
    server_params = StdioServerParameters(
        command="python",
        args=["-m", "app.mcp_server"],
        env=os.environ.copy()
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            print("\n--- Connected to MCP Server ---")

            # List Tools
            print("\n--- Available Tools ---")
            tools = await session.list_tools()
            for tool in tools.tools:
                print(f"- {tool.name}: {tool.description}")

            # List Resources
            print("\n--- Available Resources ---")
            resources = await session.list_resources()
            for resource in resources.resources:
                print(f"- {resource.uri}: {resource.name}")

            # Test Tool: check_safety
            print("\n--- Testing Tool: check_safety ('Paris') ---")
            try:
                result = await session.call_tool("check_safety", arguments={"city": "Paris"})
                print(result.content[0].text)
            except Exception as e:
                print(f"Tool call failed: {e}")

            # Test Resource: safety://Tokyo
            print("\n--- Testing Resource: safety://Tokyo ---")
            try:
                resource = await session.read_resource("safety://Tokyo")
                print(resource.contents[0].text[:200] + "...") # Print first 200 chars
            except Exception as e:
                print(f"Resource read failed: {e}")

if __name__ == "__main__":
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
    asyncio.run(run())
