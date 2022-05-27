from django.core.exceptions import ValidationError
from django.test import TestCase
from datetime import datetime

from app.models import ListManagement, TaskManagement

class TestModelsCustomConstraints(TestCase):

    def test_task_management_negative_priority(self):
        task = TaskManagement(
            name='Jovenal',
            description='Just a short and standart task.',
            conclusion = datetime.now(),
            priority=-1,
            status='T'
        )
        with self.assertRaises(ValidationError):
            task.full_clean()

    def test_task_management_huge_priority(self):
        task = TaskManagement(
            name='Jovenal',
            description='Just a short and standart task.',
            conclusion = datetime.now(),
            priority=300,
            status='T'
        )
        with self.assertRaises(ValidationError):
            task.full_clean()

    def test_task_management_invalid_status(self):
        task = TaskManagement(
            name='Jovenal',
            description='Just a short and standart task.',
            conclusion = datetime.now(),
            priority=13,
            status='status_error'
        )
        with self.assertRaises(ValidationError):
            task.full_clean()

    def test_list_management_invalid_type(self):
        list = ListManagement(
            name='test-name',
            type = 'type_error',
            description='Just a short and standart task.'
        )
        with self.assertRaises(ValidationError):
            list.full_clean()