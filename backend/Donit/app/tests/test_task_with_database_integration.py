from django.test import TransactionTestCase, Client
from django.contrib.auth.models import User


class TestTaskWithDataBaseIntegration(TransactionTestCase):

    # Reset index after each test
    reset_sequences = True

    def test_add_and_retrieve_task_with_anonymous_user(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        test_task = {
            'name': 'test_task given name',
            'description': 'description',
            'priority': 1,
            'status': 'T',
            'dueDate': '2019-10-05',
            'list_id': 1
        }
        c.post('/app/task/1/', test_task)
        task_response = c.get('/app/task/1/', HTTP_ACCEPT='application/json')
        self.assertEqual(task_response.json()[0]['fields']['name'], 'test_task given name')
