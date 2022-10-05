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

  // public List<TodoItem> Get()
  // {
  //   var todoList = new List<TodoItem>();

  //   todoList.Add(
  //     new TodoItem
  //     {
  //       Id = 1, 
  //       Name = "プログラミング", 
  //       IsDone = false
  //     });

  //   return todoList;
  // }

  [HttpGet]
  public IEnumerable<TodoItem> Get()
  {
      return Enumerable.Range(1, 5).Select(index => new TodoItem
      {
        Id = 1, 
        Name = "プログラミング", 
        IsDone = false
      })
      .ToArray();
  }

  // [Route("form")]
  // [HttpPost]
  // public ActionResult<TodoItem> Form([FromBody] Object model)
  // {
  //   if (!ModelState.IsValid)
  //   {
  //     return BadRequest(ModelState);
  //   }

  //   return Ok(new TodoItem(){ Content = "成功！！" });
  // }
}