from django.shortcuts import render, redirect, HttpResponse
from app.models import ListManagement, TaskManagement
from django.views.decorators.csrf import csrf_exempt


def home_page(request):
    return render(request, 'home.html') #FIXME construir a pagina para exibir os dados da lista

@csrf_exempt
def new_list(request):
    if request.method == 'POST': #TODO quando um campo enviado nao existe, MultiValueDict sera lançada, escrever teste para isso.
        if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
            return HttpResponse('Erro ao adicionar lista!')
        #if len(request.POST['type']) > 2 or request.POST['type'] not in ['N', 'S', 'A', 'T', 'F']:  
        #    return HttpResponse('Erro ao adicionar lista!')
        
        my_list = ListManagement(name=request.POST['name'], type=request.POST['type'], description=request.POST['description'])
        #TODO os dados do POST feito no frontend devem vir com estes campos: name, type, description
        #my_list.save() #FIXME arrumar aqui "FOREIGN KEY constraint failed"
        return HttpResponse('Lista ' + my_list.name + ' criada!')

@csrf_exempt
def new_task(request, list_id):
    if request.method == 'POST':
        if len(request.POST['name']) > 500 or len(request.POST['description']) > 500:
            return HttpResponse('Erro ao adicionar tarefa!')
        #if len(request.POST['status']) > 2 or request.POST['status'] not in ['D', 'T']:  
        #    return HttpResponse('Erro ao adicionar tarefa!')
        
        
        my_task = TaskManagement(name=request.POST['name'], description=request.POST['description'], conclusion=request.POST['conclusion'], priority=request.POST['priority'], status=request.POST['status'])
        #my_task.save()
        return HttpResponse('Tarefa ' + my_task.name + ' criada!')

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

