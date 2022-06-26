from django.test import TransactionTestCase, Client


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
