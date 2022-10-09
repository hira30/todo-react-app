using Microsoft.AspNetCore.Mvc;
using todo_react_app.Models;

namespace todo_react_app.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController : ControllerBase
{
  private readonly ILogger<TodoController> _logger;

  public TodoController(ILogger<TodoController> logger)
  {
    _logger = logger;
  }

  [HttpGet]
  public List<TodoItem> Get()
  {
    var todoList = new List<TodoItem>();

    todoList.Add(
      new TodoItem
      {
        Id = 1, 
        Name = "プログラミング", 
        IsComplete = false
      });

    return todoList;
  }
}