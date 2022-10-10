using Microsoft.EntityFrameworkCore;

    public class TodoContext : DbContext
    {
        public TodoContext (DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<todo_react_app.Models.TodoItem> TodoItem { get; set; } = default!;
    }
