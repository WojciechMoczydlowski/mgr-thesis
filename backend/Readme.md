# Local run

#### <font color="red">Aplikacja nie ma hot swapa, po każdej zmianie w kodzie, czy to manualnie czy po zaciągnięciu zmian z gita, trzeba uruchomić aplikację jeszzce raz</font>


### Połączenie z bazą
Wymagane jest wgranie publicznego klucza ssh do GCP i użycie swojego username
tunel uruchamia się komendą
    ```ssh -L 5432:10.84.32.3:5432 twojUsername@34.118.75.142 -N```
nie można wyłączyć terminala w tym przypadku. Są jakieś flagi, żeby działało w tle. 
Po uruchomieniu baza danych jest dostępna pod `localhost:5432` 

### wraper gradle
Wymagana zainstalowana java 17.
W katalog /backend uruchom komendę. 
    ```./gradlew bootRun```

Aby uruchomić aplikację z bazą danych w pamięci aplikacji, należy wykorzystać poniższą komendę. 
Uwaga po resecie aplikacji dane zostaną utracone
    ```./gradlew bootRun --args='--spring.profiles.active=local'```


Aby uruchomić aplikację podłączoną pod bazę danych w "chmurze" należy wykorzystać komendę:
    ```./gradlew bootRun --args='--spring.profiles.active=dev'```



### intelliJ IDEA
Czasami nie łapie, że projekt jest gradleowy, wtedy trzeba na pliku build.gradle wybrać opcję "link gradle project"(coś takiego, nie pamiętam dokładnie). Wszystkie zadania gradlowe są w menu po prawej. Wybieramy z dostępnych 'bootRun'  

# Podział na pakiety
Zrobiłem oddzielny pakiet na wszystkie rzeczy związane z logowaniem. Trochę tego jest i publicznie są dostępne tylko najważniejsze rzeczy. 
W pakiecie domain są wszystkie klasy zmapowane z bd, nie są one wystawiane na świat. W modelu requesty, responsy i klasy z tym związane.
Kontrolery to klasy, które uruchamiają metody po dostaniu requestu http i zwykle uruchamiają tylko serwis. W serwisie dzieje się cała logika. Repo jest tylko do ściągania danych. 