from django.test import TransactionTestCase, Client
from django.utils import timezone
import datetime


class TestTaskWithDataBaseIntegration(TransactionTestCase):

    # Reset index after each test
    reset_sequences = True

    def test_add_and_retrieve_task(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        test_task = {
            'name': 'test_task given name',
            'description': 'description',
            'priority': 1,
            'status': 'T',
            'dueDate': datetime.datetime.now(tz=timezone.utc),
            'list_id': 1
        }
        c.post('/app/task/1/', test_task)
        task_response = c.get('/app/task/1/', HTTP_ACCEPT='application/json')
        self.assertEqual(task_response.json()[0]['fields']['name'], 'test_task given name')

    def test_add_and_delte(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        test_task = {
            'name': 'test_task given name',
            'description': 'description',
            'priority': 1,
            'status': 'T',
            'dueDate': datetime.datetime.now(tz=timezone.utc),
            'list_id': 1
        }
        c.post('/app/task/1/', test_task)
        c.delete('/app/task/1/')
        task_response = c.get('/app/task/1/', HTTP_ACCEPT='application/json')
        self.assertEqual(task_response.json(), [])

    def test_add_two_tasks(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        test_task = {
            'name': 'test_task given name',
            'description': 'description',
            'priority': 1,
            'status': 'T',
            'dueDate': datetime.datetime.now(tz=timezone.utc),
            'list_id': 1
        }
        test_task_2 = {
            'name': 'second test_task given name',
            'description': 'description',
            'priority': 1,
            'status': 'T',
            'dueDate': datetime.datetime.now(tz=timezone.utc),
            'list_id': 1
        }
        c.post('/app/task/1/', test_task)
        c.post('/app/task/1/', test_task_2)
        task_response = c.get('/app/task/1/', HTTP_ACCEPT='application/json')
        self.assertEqual(task_response.json()[1]['fields']['name'], 'second test_task given name')
