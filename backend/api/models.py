from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


# ===========================
#  Custom User Manager
# ===========================
class CustomUserManager(BaseUserManager):
    """
    Кастомный менеджер пользователей, отвечающий за создание
    обычного пользователя и суперпользователя.
    """

    def create_user(self, username, email, name, password=None):
        if not email:
            raise ValueError(_("Пользователь должен иметь email"))
        if not username:
            raise ValueError(_("Пользователь должен иметь имя пользователя"))

        user = self.model(
            email=self.normalize_email(email),
            username=username,
            name=name,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, name, password=None):
        user = self.create_user(
            email=email,
            username=username,
            name=name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


# ===========================
#  User Model
# ===========================
class User(AbstractBaseUser):
    """
    Основная модель пользователя.
    Хранит общую информацию и учетные данные.
    """

    id = models.AutoField(
        primary_key=True, unique=True, verbose_name=_("ID")
    )
    username = models.CharField(
        max_length=150,
        unique=True,
        verbose_name=_("Имя пользователя")
    )
    email = models.EmailField(
        unique=True,
        verbose_name=_("Email")
    )
    is_admin = models.BooleanField(
        default=False,
        verbose_name=_("Администратор")
    )

    # необязательные для регистрации поля
    name = models.CharField(
        max_length=255,
        verbose_name=_("Имя"),
        blank=True,
        null=True
    )

    vk_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("ВК айди")
    )
    tg_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("Телеграм айди")
    )
    institution = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("Учебное заведение")
    )
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name=_("Дата рождения")
    )
    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "name"]

    class Meta:
        verbose_name = _("Пользователь")
        verbose_name_plural = _("Пользователи")

    def __str__(self):
        return self.username

    @property
    def is_staff(self):
        """Django admin compatibility."""
        return self.is_admin


# ===========================
#  Event
# ===========================
class Event(models.Model):
    """
    Мероприятие (хакатон/интенсив).
    """

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


# ===========================
#  Case
# ===========================
class Case(models.Model):
    """
    Кейс (задание), выдаваемый командам на мероприятии.
    """

    name = models.CharField(max_length=255, verbose_name=_("Название"))
    description = models.TextField(verbose_name=_("Описание"))
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE,
        related_name="cases",
        verbose_name=_("Мероприятие")
    )

    class Meta:
        verbose_name = _("Кейс")
        verbose_name_plural = _("Кейсы")

    def __str__(self):
        return self.name


# ===========================
#  Team
# ===========================
class Team(models.Model):
    """
    Команда – участник мероприятия.
    """

    name = models.CharField(max_length=255, verbose_name=_("Название"))
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE,
        related_name="teams",
        verbose_name=_("Мероприятие")
    )
    case = models.ForeignKey(
        Case, on_delete=models.CASCADE,
        related_name="teams",
        verbose_name=_("Кейс")
    )

    class Meta:
        verbose_name = _("Команда")
        verbose_name_plural = _("Команды")

    def __str__(self):
        return self.name


# ===========================
#  User–Team relation
# ===========================
class UserTeam(models.Model):
    """
    Участник команды.
    Один пользователь может быть в нескольких командах.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name="user_teams",
        verbose_name=_("Пользователь")
    )
    team = models.ForeignKey(
        Team, on_delete=models.CASCADE,
        related_name="team_members",
        verbose_name=_("Команда")
    )

    class Meta:
        verbose_name = _("Участник команды")
        verbose_name_plural = _("Участники команд")

    def __str__(self):
        return f"{self.user} → {self.team}"


# ===========================
#  Checkpoint
# ===========================
class Checkpoint(models.Model):
    """
    Промежуточная точка/раунд презентаций команд.
    """

    start_time = models.DateTimeField(verbose_name=_("Время начала"))
    presentation_duration = models.IntegerField(verbose_name=_("Длительность презентации (мин)"))
    interval_duration = models.IntegerField(verbose_name=_("Перерыв между командами (мин)"))
    case = models.ForeignKey(
        Case, on_delete=models.CASCADE,
        related_name="checkpoints",
        verbose_name=_("Кейс")
    )
    place = models.CharField(max_length=255, verbose_name=_("Место"))

    class Meta:
        verbose_name = _("Чекпоинт")
        verbose_name_plural = _("Чекпоинты")


# ===========================
#  Likes
# ===========================
class Like(models.Model):
    """
    Лайк (голос) за команду на определённом чекпоинте.
    """

    team = models.ForeignKey(
        Team, on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Команда")
    )
    checkpoint = models.ForeignKey(
        Checkpoint, on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Чекпоинт")
    )
    liked_by = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name="likes",
        verbose_name=_("Пользователь")
    )

    class Meta:
        verbose_name = _("Лайк")
        verbose_name_plural = _("Лайки")

    def __str__(self):
        return f"{self.liked_by} → {self.team}"


# ===========================
#  Event Role System
# ===========================
class EventRole(models.TextChoices):
    """
    Перечисление всех возможных ролей пользователя в мероприятии.
    """
    MANAGER = "manager", _("Менеджер")
    JURY = "jury", _("Член жюри")
    PARTICIPANT = "participant", _("Участник")


class EventUserRole(models.Model):
    """
    Роль пользователя в рамках конкретного мероприятия.
    Один и тот же пользователь может иметь разные роли в разных событиях.
    """

    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name="event_roles",
        verbose_name=_("Пользователь")
    )
    event = models.ForeignKey(
        Event, on_delete=models.CASCADE,
        related_name="user_roles",
        verbose_name=_("Мероприятие")
    )
    role = models.CharField(
        max_length=20,
        choices=EventRole.choices,
        verbose_name=_("Роль")
    )

    class Meta:
        verbose_name = _("Роль пользователя в мероприятии")
        verbose_name_plural = _("Роли пользователей в мероприятиях")
        unique_together = ("user", "event", "role")

    def __str__(self):
        return f"{self.user} → {self.event}: {self.role}"
