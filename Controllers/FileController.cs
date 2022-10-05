using Microsoft.AspNetCore.Mvc;

namespace todo_react_app.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FileController : ControllerBase
{
  private readonly ILogger<FileController> _logger;

  public FileController(ILogger<FileController> logger)
  {
    _logger = logger;
  }

  [Route("upload")]
  [HttpPost]
  public async Task<byte[]> Upload([FromForm] DocumentCreateRequest request)
  {
    var filename = request.File.FileName;

    using var memoryStream = new MemoryStream();
    await request.File.CopyToAsync(memoryStream);
    var result = memoryStream.ToArray();
    return result;
  }

  public record DocumentCreateRequest(
    [FromForm(Name = "file")]
    IFormFile File);

}