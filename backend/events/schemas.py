from ninja import Schema
from typing import Optional, List
from datetime import datetime

# -----------------------
# Event
# -----------------------


class EventSchema(Schema):
    id: int
    name: str
    description: str
    date_time: datetime
    place: str


class EventCreateSchema(Schema):
    name: str
    description: str
    date_time: datetime
    place: str


class EventUpdateSchema(Schema):
    name: Optional[str] = None
    description: Optional[str] = None
    date_time: Optional[datetime] = None
    place: Optional[str] = None


# -----------------------
# Case
# -----------------------
class CaseSchema(Schema):
    id: int
    name: str
    description: str
    event_id: int


class CaseCreateSchema(Schema):
    name: str
    description: str
    event_id: int


class CaseUpdateSchema(Schema):
    name: Optional[str] = None
    description: Optional[str] = None


# -----------------------
# Team
# -----------------------
class TeamSchema(Schema):
    id: int
    name: str
    event_id: int
    case_id: int


class TeamCreateSchema(Schema):
    name: str
    event_id: int
    case_id: int


class TeamUpdateSchema(Schema):
    name: Optional[str] = None


# -----------------------
# Checkpoint
# -----------------------
class CheckpointSchema(Schema):
    id: int
    start_time: datetime
    presentation_duration: int
    interval_duration: int
    case_id: int
    place: str


class CheckpointCreateSchema(Schema):
    start_time: datetime
    presentation_duration: int
    interval_duration: int
    case_id: int
    place: str


class CheckpointUpdateSchema(Schema):
    start_time: Optional[datetime] = None
    presentation_duration: Optional[int] = None
    interval_duration: Optional[int] = None
    place: Optional[str] = None


# -----------------------
# Like
# -----------------------
class LikeSchema(Schema):
    id: int
    team_id: int
    checkpoint_id: int
    liked_by: int


class LikeCreateSchema(Schema):
    team_id: int
    checkpoint_id: int
    liked_by: int
