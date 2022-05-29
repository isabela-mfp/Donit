from django.test import TestCase, Client
from app.views import login_function
from django.contrib.auth.models import User
from unittest.mock import patch


class TestUserLogin(TestCase):
	def setUp(self):
		self.u1 = User.objects.create_user(username='dummy', password='dummypass')

	def test_sucess_login(self):
		c = Client()
		response = c.post('/login', {'username':'dummy', 'password':'dummypass'})
		self.assertEqual(response.status_code, 200)

	def test_fail_login(self):
		c = Client()
		response = c.post('/login', {'username':'dummy', 'password':'wrongpass'})
		self.assertEqual(response.status_code, 401)