namespace Objects
{
    public class Person
    {
        public string Name { get; set; }
        public short Age { get; set; }

        public Person(string name, short age)
        {
            this.Name = name;
            this.Age = age;
        }

        public static Person Create(string name, short age) => new Person(name, age);
    }
}