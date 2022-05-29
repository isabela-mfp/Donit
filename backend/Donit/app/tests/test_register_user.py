from django.test import TestCase, Client
from app.views import registration
from django.contrib.auth.models import User

class TestUserLogin(TestCase):
	def test_sucess_register(self):
		c = Client()
		response = c.post('/register', {'username':'dummy', 'email':'dummy@dummy', 'password':'dummypass'})
		self.assertEqual(response.status_code, 200)

	def test_no_username_register(self):
		c = Client()
		response = c.post('/register', {'email':'dummy@dummy', 'password':'dummypass'})
		self.assertEqual(response.status_code, 400)

	def test_no_password_register(self):
		c = Client()
		response = c.post('/register', {'username':'dummy','email':'dummy@dummy'})
		self.assertEqual(response.status_code, 400)

	def test_no_email_register(self):
		c = Client()
		response = c.post('/register', {'username':'dummy','password':'dummypass'})
		self.assertEqual(response.status_code, 400)