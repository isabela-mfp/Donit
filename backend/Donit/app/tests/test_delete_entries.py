from django.test import TestCase
from app.models import ListManagement, TaskManagement
from django.contrib.auth.models import User
import datetime

# Testes para o banco de dados
class TestDeleteListas(TestCase):
    def setUp(self): 
        self.u1 = User(username='dummy')
        self.u1.save()
        self.L = ListManagement 
        self.L.userid = self.u1

    def test_criar_lista_e_deletar(self): 
        self.L = ListManagement(name='Lista 1', description='Esta eh a primeira lista de teste', type='A')
        self.L.save()
        self.L.delete()
        
        
class TestDeleteTasks(TestCase):
    def setUp(self): 
        self.u1 = User(username='dummy')
        self.u1.save()
        self.L = TaskManagement 
        self.L.userid = self.u1
    def tearDown(self): 
        pass
    def test_criar_tarefa_e_deletar(self): 
        self.L = TaskManagement(name='Tarefa 1', description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        self.L.save()
        self.L.delete()

