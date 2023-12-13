# Farmacias "del centro"

class Farmacia:
    def __init__(self, farmaceutico, direccion):
        self.farmaceutico = farmaceutico
        self.direccion = direccion
        self.medicamentos = []
        self.pacientes = []
        
    #Metodo addMedicamento
    def addMedicamento(self,medicamento):
        self.medicamentos.append(medicamento)
        
    #Metodo addPaciente - 1
    def addPaciente(self,paciente):
        if paciente in self.pacientes:
            return False
        
        for medicamento in self.medicamentos:
            if paciente.sePuedeRecomendar(medicamento):
                paciente.addMedicamento(medicamento)
                paciente.getResistenciaRestante -= medicamento.getResistenciaGenerada()

        self.pacientes[paciente] = paciente.getCantidadMedicamentosRecomendados()
        return True 

class Medicamento:
    def __init__(self, nombre, resistencia_generada):
        self.nombre = nombre
        self.resistencia_generada = resistencia_generada
        self.indicaciones = []

    def getNombre(self):
        return self.nombre

    def getResistenciaGenerada(self):
        return self.resistencia_generada

    def alivia(self, sintoma):
        return sintoma in self.indicaciones

    def addIndicacion(self, indicacion):
        self.indicaciones.append(indicacion)

    def equals(self, otro_medicamento):
        return self.nombre == otro_medicamento.getNombre()


class Paciente:
    def __init__(self, nombre, resistencia_restante):
        self.nombre = nombre
        self.resistencia_restante = resistencia_restante
        self.sintomas = []
        self.medicamentos_recomendados = []

    def getNombre(self):
        return self.nombre

    def getResistenciaRestante(self):
        return self.resistencia_restante

    def addMedicamento(self, medicamento):
        self.medicamentos_recomendados.append(medicamento)

    def sePuedeRecomendar(self, medicamento):
        return medicamento.getResistenciaGenerada() <= self.resistencia_restante

    def getCantidadMedicamentosRecomendados(self):
        return len(self.medicamentos_recomendados)

    def aliviaSintomas(self, medicamento):
        for sintoma in self.sintomas:
            if medicamento.alivia(sintoma):
                return True
        return False

    def equals(self, otro_paciente):
        return self.nombre == otro_paciente.getNombre()
    
class PacienteAlergico(Paciente):
    def __init__(self, nombre, resistencia_restante):
        super().__init__(nombre, resistencia_restante)
        self.tolerancias = []
        
    def addTolerancia(self, tolerancia, valor):
        for i, j in enumerate(self.tolerancias):
            if j[0] == tolerancia:
                self.tolerancias[i] = (tolerancia, j[i] + valor)
                return
        
        self.tolerancias.append((tolerancia,valor))
        
        
# pa1 = PacienteAlergico("Pedro", 1000)
# pa1.addTolerancia("ibuprofeno", 600)
# pa1.addTolerancia("buscapina", 300)

# print(f"Tolerancias: {pa1.tolerancias}")
    
    
#TODO: EJERCICIO 1-
# Viendo el desarrollo actual, la arquitectura de software se dio cuenta de que nadie implemento la responsabilidad de registrar un nuevo paciente. Por ese motivo, nos ha asignado esa tarea con la siguiente descripcion:
#Metodo addPaciente: Recibe un Paciente y retorna un boolean
# Si el paciente ya se encuentra agregado ==> Retorna Falso
# Por cada medicamento en la lista de medicamentos: Si el medicamento esta recomendado: Agrega el medicamento al paciente, Disminuye la resistencia del paciente a medicamentos con el valor de resistenciaGenerada del medicamento
# Agregar al paciente el mapa de pacientes junto con la cantidad de medicamentos recomendados(se puede obtener con el metodo getCantidadMedicamentosRecomendados)
# Retorna Verdadero

#TODO: Ejercicios 2-
# En la farmacia se dan cuenta que no todos los medicamentos son aptos para todos los pacientes, y deciden modelar dichas restricciones en un nuevo tipo de paciente, el PacienteAlergico. En principio estos pacientes se diferencian de los otros en que poseen una tolerancia determinada a los componentes de los medicamentos. Nos han especificado que, para agregar una nueva restriccion al paciente, se debe primero verificar que dicha restriccion no se encuentre ya ingresada. Si la tolerancia ya se encuentra agregada hay que actualizar su valor como el valor actual mas el valor  a registrar

#TODO: Ejercicios 3-

# Hasta este momento, se verificaba si era posible recomendar un medicamento para un paciente si dicho medicamento no le habia sido recomendado hasta el momento, el medicamento alivia alguno de los sintomas del paciente y si el nivel de resistencia del paciente es mayor o igual  que la resistencia que genera el medicamento. Dicha comprobacion esta implementada en la clase paciente:



#TODO: Ejercicios 5-
# def elementos_distintos(lista):
#     return len(lista) == len(set(lista))

# #Test
# lista1 = (1,2,3,4,5,6,7)
# lista2 = (1,2,3,2,4,5,6,1,7,3)

# print(elementos_distintos(lista1)) #Esto retorna True ya que todos los elementos son distintos
# print(elementos_distintos(lista2)) #Esto retorna False ya que la longitud de la lista2 es mayor a la longitud del conjunto 


    def recomendarMedicamento(self, paciente, medicamento):
        if medicamento not in paciente.medicamentos_recomendados:
            if any(medicamento.alivia(sintoma) for sintoma in paciente.sintomas):
                if paciente.getResistenciaRestante() >= medicamento.getResistenciaGenerada():
                    return True 
        return False