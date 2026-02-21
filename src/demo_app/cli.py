import argparse

from demo_app.math_utils import add, divide, multiply, subtract


def main():
    parser = argparse.ArgumentParser(description="Demo CLI App")
    parser.add_argument("command", choices=["add", "sub", "mul", "div"])
    parser.add_argument("a", type=float)
    parser.add_argument("b", type=float)

    args = parser.parse_args()

    if args.command == "add":
        print(add(args.a, args.b))
    elif args.command == "sub":
        print(subtract(args.a, args.b))
    elif args.command == "mul":
        print(multiply(args.a, args.b))
    elif args.command == "div":
        print(divide(args.a, args.b))


if __name__ == "__main__":
    main()
