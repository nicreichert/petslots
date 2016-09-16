# Pet Slots

Simple game of slots created with pixi.js

## Dependencies

| Dependency   										 | Version    
| -------------------------------------------------- | ---------- 
| [compass](http://compass-style.org)      			 | 1.0.3         
| [sass](http://sass-lang.com)         				 | 3.4.22     
| [uglify.js](https://github.com/mishoo/UglifyJS)    | 2.7.3

## Run

Define virtual host in apache *httpd-vhosts.conf* file as follows:

```xml
<VirtualHost *:80>
    ServerName web.petslots
    DocumentRoot "path/to/your/directory/"
    <Directory "path/to/your/directory/">
        DirectoryIndex index.html
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

**Windows path**: apache/conf/extra/httpd-vhosts.conf 

**Mac path**: /etc/apache2/extra/httpd-vhosts.conf

Then, add to file *hosts* 

```
127.0.0.1    web.petslots
```

**Windows path**: Windows/System32/drivers/etc/hosts

**Mac path**: /etc/hosts

Now your local web build should be accessible from [http://web.petslots](http://web.petslots).

## Test

You can test run the game [here](https://nicolasjr.github.io/petslots/).

## Credits

Art by [Bianca Grassi](http://biancagrassi.com)

