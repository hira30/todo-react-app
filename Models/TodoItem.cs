namespace todo_react_app.Models;

public class TodoItem
{
    public DateTime Date { get; set; }

    public int Id { get; set; }

    public string? Name { get; set; }

    public bool IsDone { get; set; }
}