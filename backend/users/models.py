from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """Менеджер для создания пользователя и суперпользователя"""

    def create_user(self, username, email, name=None, password=None):
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

    def create_superuser(self, username, email=None, name=None, password=None):
        user = self.create_user(
            username=username,
            email=email,
            name=name,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    """Основная модель пользователя"""

    id = models.AutoField(
        primary_key=True,
        unique=True,
        verbose_name=_("ID")
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

    # необязательные поля
    name = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("Имя")
    )
    vk_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("VK ID")
    )
    tg_id = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        verbose_name=_("Telegram ID")
    )
    institution = models.CharField(
        max_length=255,
        blank=True,
        null=True,
        verbose_name=_("Учебное заведение / организация")
    )
    birth_date = models.DateField(
        blank=True,
        null=True,
        verbose_name=_("Дата рождения")
    )

    # остальное
    is_admin = models.BooleanField(
        default=False,
        verbose_name=_("Администратор")
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
        """Для совместимости с Django Admin"""
        return self.is_admin

    @property
    def is_staff(self):
        """Для совместимости с Django Admin"""
        return self.is_admin

    def has_perm(self, perm, obj=None):
        """Для совместимости с Django Admin"""
        return self.is_admin

    def has_module_perms(self, app_label):
        """Для совместимости с Django Admin"""
        return self.is_admin

class EventRole(models.TextChoices):
    MANAGER = "manager", _("Менеджер")
    JURY = "jury", _("Член жюри")
    PARTICIPANT = "participant", _("Участник")


class EventUserRole(models.Model):
    """Роль пользователя в рамках конкретного мероприятия"""

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="event_roles",
        verbose_name=_("Пользователь")
    )
    event_id = models.IntegerField(
        verbose_name=_("ID мероприятия")
    )
    role = models.CharField(
        max_length=20,
        choices=EventRole.choices,
        verbose_name=_("Роль")
    )

    class Meta:
        verbose_name = _("Роль пользователя в мероприятии")
        verbose_name_plural = _("Роли пользователей в мероприятиях")
        unique_together = ("user", "event_id", "role")

    def __str__(self):
        return f"{self.user} → {self.role} в событии {self.event_id}"
