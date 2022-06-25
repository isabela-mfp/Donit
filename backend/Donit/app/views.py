from django.shortcuts import render, redirect, HttpResponse
from app.models import ListManagement, TaskManagement
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.utils.datastructures import MultiValueDictKeyError


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
        except MultiValueDictKeyError as e:
            return JsonResponse({'function': 'new_task', 'result': 'fail'}, status=405)

        my_task = TaskManagement(
            name=name,
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
