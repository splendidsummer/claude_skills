import pytest

from demo_app.math_utils import add, divide, multiply, subtract


def test_add():
    assert add(3, 4) == 7


def test_subtract():
    assert subtract(10, 3) == 7


def test_multiply():
    assert multiply(2, 5) == 10


def test_divide():
    assert divide(10, 2) == 5


def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)
