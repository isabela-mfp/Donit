from django.test import TestCase, Client


#Testes para views
class TestShowList(TestCase):
    def setUp(self): 
        pass
    
    def test_retorna_home_page(self): 
    	c = Client()
    	response = c.get('/')
    	self.assertTrue(response.status_code, 200)
    	self.assertIn(response.text, 'Lista To-Do')
