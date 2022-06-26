from django.test import TestCase
from app.models import ListManagement, TaskManagement
from django.contrib.auth.models import User
import datetime

# Testes para o banco de dados
class TestDeleteEntries(TestCase):
    def setUp(self):
        self.user1 = User(1)
        self.user1.save()
        self.dummy_list = ListManagement(userid=self.user1, name="lista 1", type="N", description="esta eh uma lista 1")
    
    def test_criar_lista_e_deletar(self): 
        test_list = ListManagement(name='Lista 1', userid_id=1, description='Esta eh a primeira lista de teste', type='A')
        test_list.save()
        test_list.delete()
        self.assertEqual(ListManagement.objects.all().count(), 0)
    
    def test_criar_tarefa_e_deletar(self): 
        test_task = TaskManagement(name='Tarefa 1', listid=self.dummy_list
            , description='Esta eh a primeira tarefa de teste', conclusion=datetime.date(2022, 9, 9), priority=1, status='T')
        test_task.save()
        test_task.objects.filter(id=test_task.id).delete()
        self.assertEqual(ListManagement.objects.all().count(), 0)

