from django.test import TestCase, Client


class TestExibeViews(TestCase):
    def setUp(self): 
        self.client = Client()
    
    def test_access_home_page(self): 
        response = self.client.get('/')
        self.assertTrue(response.status_code, 200)
    
    def test_access_registration_page(self): 
        response = self.client.post('/register', {'username':'alice', 'email':'alice@email.com', 'password':'123'})
        self.assertTrue(response.status_code, 200)
        
    def test_access_login_page(self): 
        response = self.client.get('/login')
        self.assertTrue(response.status_code, 200)

