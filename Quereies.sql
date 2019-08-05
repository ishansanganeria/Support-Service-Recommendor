SELECT AVG(Battery_Life) from stats
WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

SELECT AVG(Temperature) from stats
WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

SELECT AVG(RAM) from stats
WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

SELECT AVG(CPU) from stats
WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)

SELECT AVG(Disk) from stats
WHERE DATE > (CURRENT_DATE) - 10 AND Serial_Number = (SERIAL_NUMBER)
