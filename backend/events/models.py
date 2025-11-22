from django.db import models
from users.models import User
from django.utils.translation import gettext_lazy as _


class Event(models.Model):
    """Мероприятие (хакатон/интенсив)"""

    name = models.CharField(
        max_length=255,
        verbose_name=_("Название")
    )
    description = models.TextField(
        verbose_name=_("Описание")
    )
    date_time = models.DateTimeField(
        verbose_name=_("Дата и время проведения")
    )
    place = models.CharField(
        max_length=255,
        verbose_name=_("Место проведения")
    )

    class Meta:
        verbose_name = _("Мероприятие")
        verbose_name_plural = _("Мероприятия")

    def __str__(self):
        return self.name


class Case(models.Model):
    """Кейс для команд на мероприятии"""

    name = models.CharField(
        max_length=255,
        verbose_name=_("Название")
    )
    description = models.TextField(
        verbose_name=_("Описание")
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="cases",
        verbose_name=_("Мероприятие")
    )

    class Meta:
        verbose_name = _("Кейс")
        verbose_name_plural = _("Кейсы")

    def __str__(self):
        return self.name


class Team(models.Model):
    """Команда-участник мероприятия"""

    name = models.CharField(
        max_length=255,
        verbose_name=_("Название")
    )
    event = models.ForeignKey(
        Event,
        on_delete=models.CASCADE,
        related_name="teams",
        verbose_name=_("Мероприятие")
    )
    case = models.ForeignKey(
        Case,
        on_delete=models.CASCADE,
        related_name="teams",
        verbose_name=_("Кейс")
    )

    class Meta:
        verbose_name = _("Команда")
        verbose_name_plural = _("Команды")

    def __str__(self):
        return self.name


class UserTeam(models.Model):
    """Связь пользователя и команды"""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="user_teams",
        verbose_name=_("Пользователь")
    )
    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="team_members",
        verbose_name=_("Команда")
    )

    class Meta:
        verbose_name = _("Участник команды")
        verbose_name_plural = _("Участники команд")

    def __str__(self):
        return f"{self.user} → {self.team}"


class Checkpoint(models.Model):
    """Промежуточная точка / раунд презентаций"""

    start_time = models.DateTimeField(
        verbose_name=_("Время начала")
    )
    presentation_duration = models.IntegerField(
        verbose_name=_("Длительность презентации (мин)")
    )
    interval_duration = models.IntegerField(
        verbose_name=_("Интервал между командами (мин)")
    )
    case = models.ForeignKey(
        Case,
        on_delete=models.CASCADE,
        related_name="checkpoints",
        verbose_name=_("Кейс")
    )
    place = models.CharField(
        max_length=255,
        verbose_name=_("Место")
    )

    class Meta:
        verbose_name = _("Чекпоинт")
        verbose_name_plural = _("Чекпоинты")


class Like(models.Model):
    """Лайки команд на чекпоинтах"""

    team = models.ForeignKey(
        Team,
        on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Команда")
    )
    checkpoint = models.ForeignKey(
        Checkpoint,
        on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Чекпоинт")
    )
    liked_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Пользователь")
    )

    class Meta:
        verbose_name = _("Лайк")
        verbose_name_plural = _("Лайки")

    def __str__(self):
        return f"{self.liked_by} → {self.team}"
