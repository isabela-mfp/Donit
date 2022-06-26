from django.test import TransactionTestCase, Client
from django.contrib.auth.models import User


class TestDataBaseIntegration(TransactionTestCase):

    # Reset index after each test
    reset_sequences = True

    def test_add_and_retrieve_list_with_anonymous_user(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        lists_response = c.get('/app/list', HTTP_ACCEPT='application/json')
        self.assertEqual(lists_response.json()[0]['fields']['name'], 'ListaTeste001')

    def test_add_and_delte_list_with_anonymous_user(self):
        c = Client()
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        c.delete('/app/list/1/')
        lists_response = c.get('/app/list', HTTP_ACCEPT='application/json')
        self.assertEqual(lists_response.json(), [])

    def test_add_and_retrieve_list_with_auth_user(self):
        User.objects.create_user(username='dummy1', password='dummypass1')
        User.objects.create_user(username='dummy2', password='dummypass2')
        c = Client()
        c.post('/login', {'username':'dummy2', 'password':'dummypass2'})
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        lists_response = c.get('/app/list', HTTP_ACCEPT='application/json')
        self.assertEqual(lists_response.json()[0]['fields']['name'], 'ListaTeste001')
        self.assertEqual(lists_response.json()[0]['fields']['userid'], 2)

    def test_register_logging_manipulate_list_loggout(self):
        c = Client()
        c.post('/register', {'username':'dummy1', 'email':'dummy@dummy1', 'password':'dummypass1'})
        c.post('/register', {'username':'dummy2','email':'dummy@dummy2', 'password':'dummypass2'})
        c.post('/login', {'username':'dummy2', 'password':'dummypass2'})
        c.post('/app/list',{'name':'ListaTeste001', 'description':'description test example','type':'1'})
        lists_response = c.get('/app/list', HTTP_ACCEPT='application/json')
        c.post('/logout')
        self.assertEqual(lists_response.json()[0]['fields']['name'], 'ListaTeste001')
        self.assertEqual(lists_response.json()[0]['fields']['userid'], 2)
