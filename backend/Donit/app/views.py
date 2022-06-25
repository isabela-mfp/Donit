from django.shortcuts import render, redirect, HttpResponse
from app.models import ListManagement, TaskManagement
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError
from django.core import serializers
from datetime import datetime

@csrf_exempt
def list_controller(request, request_id=None):

    if request.method == 'DELETE':
        """Delete a list by ID"""
        if not request_id:
            return JsonResponse({'function': 'delete_list', 'result': 'No list id'}, status=400)
        ListManagement.objects.filter(id=request_id).delete()
        return HttpResponse('success')

    elif request.method == 'GET':
        """Get Lists by user ou one list by ID"""
        if not request_id: # Get by USER
            if not request.user.id:
                try:
                    request_user = User.objects.get(id=1)
                except Exception as e:
                    request_user = (
                        User.objects
                        .create_user(
                            "Anonimo",
                            "anonimo@anonimo.com",
                            "123"
                        )
                    )
                    request_user = User.objects.get(id=1)
            else:
                request_user = User.objects.get(id=request.user.id)
            all_user_lists = ListManagement.objects.filter(userid=request_user.id)
            json_res = serializers.serialize('json', all_user_lists)
            return HttpResponse(json_res, content_type='application/json')
        else:
            list = ListManagement.objects.filter(id=request_id)
            json_res = serializers.serialize('json', list)
            return HttpResponse(json_res, content_type='application/json')

    elif request.method == 'POST':
        """ Funçao que cria nova lista """
        try:
            name = request.POST['name']
            description = request.POST['description']
            type = request.POST['type'],
            if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
                raise MultiValueDictKeyError()
        except MultiValueDictKeyError as e:
            return JsonResponse({'function': 'new_list', 'result': 'fail'}, status=400)

        if not request.user.id:
            try:
                request_user = User.objects.get(id=1)
            except Exception as e:
                request_user = (
                    User.objects
                    .create_user(
                        "Anonimo",
                        "anonimo@anonimo.com",
                        "123"
                    )
                )
                request_user = User.objects.get(id=1)
        else:
            request_user = User.objects.get(id=request.user.id)

        my_list = ListManagement(
            userid=request_user,
            name=name,
            type=type,
            description=description
        )

        try:
            my_list.save()
        except Exception:
            return JsonResponse({'function': 'new_list', 'result': 'save_failed'}, status=400)
        return JsonResponse({'function': 'new_list', 'result': 'success'}, status=200)
    else:
        return JsonResponse({'function': 'new_list', 'result': 'method_not_allowed'}, status=400)


@csrf_exempt
def task_controller(request, request_id=None):
    # if request.method == 'GET':
     #    if not request.user.id:

    if request.method == 'DELETE':
        if not request_id:
            return JsonResponse({'function': 'new_task', 'result': 'No task id'}, status=400)
        TaskManagement.objects.filter(id=request_id).delete()
        return HttpResponse('success')

    elif request.method == 'GET':
        if not request_id:
            return JsonResponse({'function': 'new_task', 'result': 'No list id'}, status=400)
        all_taks_in_list = TaskManagement.objects.filter(listid=request_id)
        json_res = serializers.serialize('json', all_taks_in_list)
        return HttpResponse(json_res, content_type='application/json')

    elif request.method == 'POST':
        #if len(request.POST['status']) > 2 or request.POST['status'] not in ['D', 'T']:
        #    return HttpResponse('Erro ao adicionar tarefa!')
        try:
            name = request.POST['name']
            description = request.POST['description']
            priority = request.POST['priority']
            status = request.POST['status']
            dueDate = request.POST['dueDate']
            list_id = request_id
            if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
                raise MultiValueDictKeyError()
            request_list = ListManagement.objects.get(id=list_id)
            if not request_list:
                raise Exception()
        except MultiValueDictKeyError as e:
            return JsonResponse({'function': 'new_task', 'result': 'fail'}, status=400)
        except Exception as e:
            return JsonResponse({'function': 'new_task', 'result': 'fail in request list'}, status=400)
        my_task = TaskManagement(
            name=name,
            listid=request_list,
            description=description,
            priority=priority,
            status=status,
            dueDate=dueDate
        )
        try:
            my_task.save()
        except Exception as e:
            return JsonResponse({'function': 'new_task', 'result': str(e)}, status=400)
        return JsonResponse({'function': 'new_task', 'result': 'success'}, status=200)
    elif request.method == 'PUT':
        selected_task = TaskManagement.objects.get(pk=request_id)
        if (selected_task.conclusion == None):
            selected_task.conclusion = datetime.now()
        else:
            selected_task.conclusion = None
        selected_task.save()
        return HttpResponse(None, content_type='application/json')
    else:
        return JsonResponse({'function': 'new_task', 'result': 'method_not_allowed'}, status=405)


'''
def home_page(request):
    return render(request, 'home.html') #FIXME construir a pagina para exibir os dados da lista

@csrf_exempt
def new_list(request):
    """ Funçao que cria nova lista """

    if request.method == 'POST':
        try:
            name = request.POST['name']
            description = request.POST['description']
            type = request.POST['type'],
            if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
                raise MultiValueDictKeyError()
        except MultiValueDictKeyError as e:
            return JsonResponse({'function': 'new_list', 'result': 'fail'}, status=405)

        if not request.user.id:
            try:
                request_user = User.objects.get(id=1)
            except Exception as e:
                request_user = (
                    User.objects
                    .create_user(
                        "Anonimo",
                        "anonimo@anonimo.com",
                        "123"
                    )
                )
                request_user = User.objects.get(id=1)
        else:
            request_user = User.objects.get(id=request.user.id)

        my_list = ListManagement(
            userid=request_user,
            name=name,
            type=type,
            description=description
        )

        try:
            my_list.save()
        except Exception:
            return JsonResponse({'function': 'new_list', 'result': 'save_failed'}, status=405)
        return JsonResponse({'function': 'new_list', 'result': 'success'}, status=200)
    else:
        return JsonResponse({'function': 'new_list', 'result': 'method_not_allowed'}, status=405)

@csrf_exempt
def new_task(request, list_id):
    if request.method == 'POST':
        #if len(request.POST['status']) > 2 or request.POST['status'] not in ['D', 'T']:
        #    return HttpResponse('Erro ao adicionar tarefa!')
        try:
            name = request.POST['name']
            description = request.POST['description']
            creation = request.POST['creation']
            conclusion = request.POST['conclusion']
            priority = request.POST['priority']
            status = request.POST['status']
            if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
                raise MultiValueDictKeyError()
            request_list = ListManagement.objects.get(id=list_id)
            if not request_list:
                raise Exception()
        except MultiValueDictKeyError as e:
            return JsonResponse({'function': 'new_task', 'result': 'fail'}, status=405)
        except Exception as e:
            return JsonResponse({'function': 'new_task', 'result': 'fail in request list'}, status=405)

        my_task = TaskManagement(
            name=name,
            listid=request_list,
            description=description,
            creation=creation,
            conclusion=conclusion,
            priority=priority,
            status=status
        )

        try:
            my_task.save()
        except Exception as e:
            return JsonResponse({'function': 'new_task', 'result': str(e)}, status=405)
        return JsonResponse({'function': 'new_task', 'result': 'success'}, status=200)
    else:
        return JsonResponse({'function': 'new_task', 'result': 'method_not_allowed'}, status=405)


@csrf_exempt
def del_task(request, task_id):
    task = TaskManagement.objects.get(pk=task_id)
    deleted = task.delete()
    return HttpResponse(str(deleted))

@csrf_exempt
def del_list(request, list_id):
    list_ = TaskManagement.objects.get(pk=list_id)
    deleted = list_.delete()
    return HttpResponse('Lista '+ str(list_id) +' deletada!')
'''

@csrf_exempt
def registration(request):
    """ Função de registro do usuário com objeto user do django """

    username = request.POST.get('username')
    email = request.POST.get('email')
    password = request.POST.get('password')
    if not username or not password or not email:
        return HttpResponse(status=400)

    new_user = User.objects.create_user(username, email, password)

    if new_user is not None:
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=400)


@csrf_exempt
def login_function(request):
    """ Função de login do usuário com objeto user do django """

    username = request.POST.get('username')
    password = request.POST.get('password')
    print(request)
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)

@csrf_exempt
def logout_function(request):
    logout(request)
    return HttpResponse(status=200)
