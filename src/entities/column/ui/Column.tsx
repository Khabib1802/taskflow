import { Button, Chip, Dropdown, Label } from '@heroui/react';
import { MoreVertical, Pencil, Plus, Trash2 } from 'lucide-react';

import { TaskCard } from '@/entities/task/ui/TaskCard';
import type { Column as ColumnType, Task } from '@/shared/api/types';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onEditColumn: (column: ColumnType) => void;
  onDeleteColumn: (id: string) => void;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export const Column = ({
  column,
  tasks,
  onEditColumn,
  onDeleteColumn,
  onAddTask,
  onEditTask,
  onDeleteTask,
}: ColumnProps) => {
  return (
    <div className="bg-content2 flex w-72 shrink-0 flex-col gap-3 rounded-xl p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-foreground text-sm font-semibold">{column.title}</h3>
          <Chip size="sm" variant="soft" color="accent">
            {tasks.length}
          </Chip>
        </div>

        <Dropdown>
          <Button isIconOnly size="sm" variant="ghost" className="text-default-400 h-6 w-6 min-w-6">
            <MoreVertical size={16} />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu
              aria-label="Действия с колонкой"
              onAction={(key) => {
                if (key === 'rename') onEditColumn(column);
                if (key === 'delete') onDeleteColumn(column.id);
              }}
            >
              <Dropdown.Item id="rename" textValue="Переименовать">
                <Pencil size={14} />
                <Label>Переименовать</Label>
              </Dropdown.Item>
              <Dropdown.Item id="delete" textValue="Удалить" variant="danger">
                <Trash2 size={14} className="text-danger" />
                <Label>Удалить</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </div>

      <Button
        size="sm"
        variant="ghost"
        className="text-default-500 justify-start"
        onPress={() => onAddTask(column.id)}
      >
        <Plus size={16} />
        Добавить задачу
      </Button>
    </div>
  );
};
