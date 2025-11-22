from ninja import Router
from .models import Event, Case, Team
from .schemas import EventSchema, TeamSchema

router = Router()

@router.get("/events/")
def list_events(request):
    events = Event.objects.all()
    return events
