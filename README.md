# count-properties-id
Counts the number of id existed across all properties file. This will help check for duplicate id's.

### Installation

`npm install count-properties-id`

### How to use

Create a json config for source path and destination path.

Example:
**myconfig.json
```
{
    src: "c:\properties",
    dist: "c:\duplicate"
}
```

then run

`count-properties-id -p myconfig.json`

### See sample below:

**myfile.properties
```
prop_hello = Hello
prop_hi = Hi
prop_ola = Ola
```

**myfile_two.properties
```
prop_thanks = Thanks
prop_welcome = welcome
prop_ola = Ola
```

It will output:

**master_file.json
```
{
    "prop_hello": 1,
    "prop_hi": 1,
    "prop_ola": 2,
    "prop_thanks": 1
    "prop_welcome": 1

}
```