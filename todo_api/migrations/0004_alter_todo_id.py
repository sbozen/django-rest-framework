# Generated by Django 4.0.4 on 2022-05-31 11:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo_api', '0003_alter_todo_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False),
        ),
    ]