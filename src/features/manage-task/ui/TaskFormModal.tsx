import { useCreateTaskMutation, useGetTasksQuery } from '@/entities/task';
import { useAuth } from '@/features/auth';
import type { Priority } from '@/shared/api/types';
import {
  Form,
  Input,
  Label,
  Modal,
  TextArea,
  TextField,
  Select,
  ListBox,
  FieldError,
  Button,
} from '@heroui/react';
import { useState, type SyntheticEvent } from 'react';

interface TaskFormModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  columnId: string;
}

const priorityOptions: { id: Priority; label: string }[] = [
  { id: 'low', label: 'Low' },
  { id: 'medium', label: 'Medium' },
  { id: 'high', label: 'High' },
];

export const TaskFormModal = ({ isOpen, onOpenChange, columnId }: TaskFormModalProps) => {
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation();
  const { data: tasks } = useGetTasksQuery();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [titleError, setTitleError] = useState<string | null>(null);

  const { user } = useAuth();

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Enter task title');
      return;
    }

    if (!user?.id) {
      console.log('Not Authorized');
      return;
    }

    const columnTasks = tasks?.filter((task) => columnId === task.column_id) ?? [];
    const nextPosition = columnTasks.reduce((max, task) => Math.max(max, task.position + 1), 0);

    await createTask({
      column_id: columnId,
      title: title.trim(),
      description: description.trim() || null,
      priority,
      position: nextPosition,
      user_id: user?.id,
    });

    onOpenChange(false);
  };

  return (
    <Modal>
      <Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange}>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger></Modal.CloseTrigger>
            <Modal.Header>
              <Modal.Heading>New Task</Modal.Heading>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <TextField isInvalid={Boolean(titleError)}>
                  <Label>Title</Label>
                  <Input
                    value={title}
                    onChange={(event) => {
                      setTitle(event.target.value);
                      if (titleError) setTitleError(null);
                    }}
                  ></Input>
                  {titleError && <FieldError>{titleError}</FieldError>}
                </TextField>
                <TextField>
                  <Label>Description</Label>
                  <TextArea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  ></TextArea>
                </TextField>
                <Select
                  placeholder="Select priority"
                  value={priority}
                  onChange={(key) => setPriority(key as Priority)}
                >
                  <Label>Priority</Label>
                  <Select.Trigger>
                    <Select.Value></Select.Value>
                    <Select.Indicator></Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {priorityOptions.map(({ id, label }) => (
                        <ListBox.Item key={id} textValue={label} id={id}>
                          {label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Modal.Body>
              <Modal.Footer>
                <Button type="button" onPress={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" isPending={isCreating}>
                  Create
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
