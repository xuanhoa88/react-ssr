import { useFrontload } from 'react-frontload';
import { Page, Loader } from '../../components';
import TodoList from './TodoList';

export default function Todos() {
  const { data: todos, frontloadMeta } = useFrontload(
    'todos',
    async ({ todos }) => {
      const { data } = await todos.fetchTodos();
      return data;
    }
  );

  if (frontloadMeta.pending) {
    return <Loader />;
  }

  if (frontloadMeta.error) {
    return <div>Failed to fetch data!</div>;
  }

  return (
    <Page title="Todos">
      <TodoList todos={todos} />
    </Page>
  );
}
