import { Button, Card, Chip, Dropdown, Label } from '@heroui/react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';

import type { Priority, Task } from '@/shared/api/types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityColors: Record<Priority, 'success' | 'warning' | 'danger'> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

const priorityLabels: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const priority = (task.priority as Priority | null) ?? 'medium';

  return (
    <Card className="w-full shadow-sm transition-shadow hover:shadow-md">
      <Card.Content className="flex flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-foreground line-clamp-2 text-sm font-semibold">{task.title}</h4>

          <Dropdown>
            <Button
              isIconOnly
              size="sm"
              variant="ghost"
              className="text-default-400 h-6 w-6 min-w-6"
            >
              <MoreVertical size={16} />
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Действия с задачей"
                onAction={(key) => {
                  if (key === 'edit') onEdit(task);
                  if (key === 'delete') onDelete(task.id);
                }}
              >
                <Dropdown.Item id="edit" textValue="Редактировать">
                  <Pencil size={14} />
                  <Label>Редактировать</Label>
                </Dropdown.Item>
                <Dropdown.Item id="delete" textValue="Удалить" variant="danger">
                  <Trash2 size={14} className="text-danger" />
                  <Label>Удалить</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>

        {task.description && (
          <p className="text-default-500 line-clamp-3 text-xs">{task.description}</p>
        )}

        <div className="mt-1 flex items-center justify-between">
          <Chip size="sm" variant="soft" color={priorityColors[priority]}>
            {priorityLabels[priority]}
          </Chip>
        </div>
      </Card.Content>
    </Card>
  );
};
