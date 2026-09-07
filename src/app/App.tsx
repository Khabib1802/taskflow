// import { Provider } from 'react-redux';
// import { store } from '@/app/store';
// import { AuthProvider } from '@/app/providers/AuthProvider';
// import { ProtectedRoute } from '@/app/providers/ProtectedRoute';
// import { AuthPage } from '@/pages/AuthPage';
// import { BoardPage } from '@/pages/BoardPage';
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <AuthProvider>
//           <Routes>
//             <Route path="/auth" element={<AuthPage />}></Route>
//             <Route
//               path="/board"
//               element={
//                 <ProtectedRoute>
//                   <BoardPage />
//                 </ProtectedRoute>
//               }
//             ></Route>
//             <Route path="*" element={<Navigate to="/board" replace />} />
//           </Routes>
//         </AuthProvider>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;

import { Column } from '@/entities/column/ui/Column';
import { TaskFormModal } from '@/features/manage-task/ui/TaskFormModal';
import type { Column as ColumnType, Task } from '@/shared/api/types';
import { Button } from '@heroui/react';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

// 1. Создаем тестовые данные для колонки
const sampleColumn: ColumnType = {
  id: 'col-1',
  title: 'В работе',
  created_at: new Date().toISOString(),
  position: 1,
  user_id: 'user-999',
};

// 2. Создаем массив тестовых задач
const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Изучить RTK Query',
    description: 'Прочитать документацию и сделать тестовый запрос',
    priority: 'high',
    column_id: 'col-1',
    user_id: 'user-999',
    position: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Medium task',
    description: 'Medium task description',
    priority: 'medium',
    column_id: 'col-1',
    user_id: 'user-999',
    position: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Low task',
    description: 'Low task description',
    priority: 'low',
    column_id: 'col-1',
    user_id: 'user-999',
    position: 3,
    created_at: new Date().toISOString(),
  },
];

// 3. Объявляем функции-заглушки для всех требуемых пропсов
const handleEditColumn = (column: ColumnType) => console.log('Редактирование колонки:', column);
const handleDeleteColumn = (id: string) => console.log('Удаление колонки с ID:', id);
const handleAddTask = (columnId: string) => console.log('Добавление задачи в колонку:', columnId);
const handleEditTask = (task: Task) => console.log('Редактирование задачи:', task);
const handleDeleteTask = (id: string) => console.log('Удаление задачи с ID:', id);

// 4. Отрендеренный компонент Column внутри контейнера приложения
export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Provider store={store}>
      <div className="bg-background flex min-h-screen items-start justify-start gap-4 p-6">
        <Column
          column={sampleColumn}
          tasks={sampleTasks}
          onEditColumn={handleEditColumn}
          onDeleteColumn={handleDeleteColumn}
          onAddTask={handleAddTask}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        <Button onPress={() => setIsOpen(true)}>Open Form</Button>
        <TaskFormModal isOpen={isOpen} onOpenChange={setIsOpen} columnId="col-1"></TaskFormModal>
      </div>
    </Provider>
  );
}
