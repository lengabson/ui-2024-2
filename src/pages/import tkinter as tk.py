import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import numpy as np
import os
from scipy.io.wavfile import read, write

datos_audio = None
frecuencia_muestreo = None
filtro_seleccionado = None
eco_activado = False  

def principal():
    """Función principal que configura la interfaz gráfica."""
    global root
    root = tk.Tk()
    root.title("Procesador de Efectos de Audio")
    root.geometry("400x800")
    root.resizable(False, False)

    estilo = ttk.Style()
    estilo.configure("TButton", font=("Arial", 10))
    estilo.configure("TLabelFrame", font=("Arial", 12, "bold"))

    ttk.Button(root, text="Cargar Audio", command=cargar_audio).pack(pady=10)
    ttk.Button(root, text="Exportar Audio", command=exportar_audio).pack(pady=10)
    ttk.Button(root, text="Aplicar Efecto", command=aplicar_efectos).pack(pady=10)

    marco_eco = ttk.LabelFrame(root, text="Efecto de Eco", padding=(10, 10))
    marco_eco.pack(padx=10, pady=10, fill="x")

    global checkbox_eco, retardo_eco, atenuacion_eco
    checkbox_eco = ttk.Checkbutton(marco_eco, text="Activar Eco", command=alternar_eco)
    checkbox_eco.pack(anchor="w", pady=5)

    retardo_eco = ttk.Scale(marco_eco, from_=0, to=2, orient="horizontal", length=250, value=0.5, state="disabled")
    ttk.Label(marco_eco, text="Retardo (s)").pack(anchor="w")
    retardo_eco.pack(pady=5)

    atenuacion_eco = ttk.Scale(marco_eco, from_=0, to=1, orient="horizontal", length=250, value=0.5, state="disabled")
    ttk.Label(marco_eco, text="Atenuación").pack(anchor="w")
    atenuacion_eco.pack(pady=5)

    marco_filtros = ttk.LabelFrame(root, text="Filtros de Audio", padding=(10, 10))
    marco_filtros.pack(padx=10, pady=10, fill="x")

    global corte_pasa_bajos, corte_pasa_altas, pasa_banda_baja, pasa_banda_alta, rechazo_banda_baja, rechazo_banda_alta, eleccion_filtro

    eleccion_filtro = tk.StringVar(value="ninguno")

    ttk.Radiobutton(marco_filtros, text="Pasa Bajos", variable=eleccion_filtro, value="pasa_bajos", 
                    command=actualizar_seleccion_filtro).pack(anchor="w")
    ttk.Radiobutton(marco_filtros, text="Pasa Altas", variable=eleccion_filtro, value="pasa_altas", 
                    command=actualizar_seleccion_filtro).pack(anchor="w")
    ttk.Radiobutton(marco_filtros, text="Pasa Banda", variable=eleccion_filtro, value="pasa_banda", 
                    command=actualizar_seleccion_filtro).pack(anchor="w")
    ttk.Radiobutton(marco_filtros, text="Rechaza Banda", variable=eleccion_filtro, value="rechazo_banda", 
                    command=actualizar_seleccion_filtro).pack(anchor="w")
    ttk.Radiobutton(marco_filtros, text="Ningún Filtro", variable=eleccion_filtro, value="ninguno", 
                    command=actualizar_seleccion_filtro).pack(anchor="w")

    corte_pasa_bajos = ttk.Scale(marco_filtros, from_=100, to=10000, orient="horizontal", length=250, value=5000, state="disabled")
    ttk.Label(marco_filtros, text="Corte Pasa Bajos (Hz)").pack(anchor="w")
    corte_pasa_bajos.pack(pady=5)

    corte_pasa_altas = ttk.Scale(marco_filtros, from_=100, to=10000, orient="horizontal", length=250, value=500, state="disabled")
    ttk.Label(marco_filtros, text="Corte Pasa Altas (Hz)").pack(anchor="w")
    corte_pasa_altas.pack(pady=5)

    pasa_banda_baja = ttk.Scale(marco_filtros, from_=100, to=5000, orient="horizontal", length=250, value=500, state="disabled")
    pasa_banda_alta = ttk.Scale(marco_filtros, from_=5000, to=10000, orient="horizontal", length=250, value=8000, state="disabled")
    ttk.Label(marco_filtros, text="Banda Pasa Baja (Hz)").pack(anchor="w")
    pasa_banda_baja.pack(pady=5)
    ttk.Label(marco_filtros, text="Banda Pasa Alta (Hz)").pack(anchor="w")
    pasa_banda_alta.pack(pady=5)

    rechazo_banda_baja = ttk.Scale(marco_filtros, from_=100, to=5000, orient="horizontal", length=250, value=1000, state="disabled")
    rechazo_banda_alta = ttk.Scale(marco_filtros, from_=5000, to=10000, orient="horizontal", length=250, value=6000, state="disabled")
    ttk.Label(marco_filtros, text="Banda Rechaza Baja (Hz)").pack(anchor="w")
    rechazo_banda_baja.pack(pady=5)
    ttk.Label(marco_filtros, text="Banda Rechaza Alta (Hz)").pack(anchor="w")
    rechazo_banda_alta.pack(pady=5)
    ttk.Button(root, text="Aplicar Efectos", command=aplicar_efectos).pack(pady=20)
    root.mainloop()

def alternar_eco():
    """Activa o desactiva la opción del eco."""
    global eco_activado
    eco_activado = not eco_activado

    estado = "normal" if eco_activado else "disabled"
    retardo_eco.config(state=estado)
    atenuacion_eco.config(state=estado)

def actualizar_seleccion_filtro():
    """Habilita o deshabilita los controles de los filtros según la selección."""
    seleccionado = eleccion_filtro.get()
    
    corte_pasa_bajos.config(state="disabled")
    corte_pasa_altas.config(state="disabled")
    pasa_banda_baja.config(state="disabled")
    pasa_banda_alta.config(state="disabled")
    rechazo_banda_baja.config(state="disabled")
    rechazo_banda_alta.config(state="disabled")
    
    if seleccionado == "pasa_bajos":
        corte_pasa_bajos.config(state="normal")
    elif seleccionado == "pasa_altas":
        corte_pasa_altas.config(state="normal")
    elif seleccionado == "pasa_banda":
        pasa_banda_baja.config(state="normal")
        pasa_banda_alta.config(state="normal")
    elif seleccionado == "rechazo_banda":
        rechazo_banda_baja.config(state="normal")
        rechazo_banda_alta.config(state="normal")

def cargar_audio():
    """Carga un archivo de audio en formato WAV."""
    global datos_audio, frecuencia_muestreo
    ruta_archivo = filedialog.askopenfilename(filetypes=[("Archivos de Audio", "*.wav")])
    if not ruta_archivo:
        return

    try:
        frecuencia_muestreo, datos_audio = read(ruta_archivo)
        if datos_audio.ndim > 1: 
            datos_audio = np.mean(datos_audio, axis=1)
        messagebox.showinfo("Éxito", f"Archivo cargado: {os.path.basename(ruta_archivo)}")
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo cargar el archivo: {e}")

def exportar_audio():
    """Exporta el audio procesado a un archivo WAV."""
    global datos_audio, frecuencia_muestreo
    if datos_audio is None:
        messagebox.showwarning("Advertencia", "No hay audio procesado para exportar.")
        return

    ruta_archivo = filedialog.asksaveasfilename(
        defaultextension=".wav",
        filetypes=[("Archivo WAV", "*.wav")],
        title="Guardar Audio"
    )
    if not ruta_archivo:
        return  

    try:
        audio_normalizado = (datos_audio * 32767).astype(np.int16)
        write(ruta_archivo, frecuencia_muestreo, audio_normalizado)
        messagebox.showinfo("Éxito", f"Audio exportado correctamente a: {os.path.basename(ruta_archivo)}")
    except Exception as e:
        messagebox.showerror("Error", f"No se pudo exportar el archivo: {e}")

def aplicar_efectos():
    """Aplica los efectos seleccionados al audio cargado."""
    global datos_audio, frecuencia_muestreo
    if datos_audio is None:
        messagebox.showwarning("Advertencia", "Primero carga un archivo de audio.")
        return

    audio_procesado = np.copy(datos_audio)

    if eco_activado:
        retardo = retardo_eco.get()  
        atenuacion = atenuacion_eco.get()  
        audio_procesado = aplicar_eco(audio_procesado, retardo, atenuacion, frecuencia_muestreo)

  
    seleccionado = eleccion_filtro.get()
    if seleccionado == "pasa_bajos":
       
        audio_procesado = aplicar_filtro_pasa_bajos(audio_procesado, corte_pasa_bajos.get(), frecuencia_muestreo)
    elif seleccionado == "pasa_altas":
      
        audio_procesado = aplicar_filtro_pasa_altas(audio_procesado, corte_pasa_altas.get(), frecuencia_muestreo)
    elif seleccionado == "pasa_banda":
        
        audio_procesado = aplicar_filtro_pasa_banda(audio_procesado, pasa_banda_baja.get(), pasa_banda_alta.get(), frecuencia_muestreo)
    elif seleccionado == "rechazo_banda":
    
        audio_procesado = aplicar_filtro_rechazo_banda(audio_procesado, rechazo_banda_baja.get(), rechazo_banda_alta.get(), frecuencia_muestreo)

    audio_procesado = normalizar_audio(audio_procesado)
    
    datos_audio[:] = audio_procesado 

    messagebox.showinfo("Éxito", "Efectos aplicados con éxito.")


from scipy import signal

def aplicar_eco(datos_audio, retardo, atenuacion, frecuencia_muestreo):
    """Aplica un efecto de eco al audio."""
    muestras_retardo = int(retardo * frecuencia_muestreo)
    audio_eco = np.zeros(len(datos_audio) + muestras_retardo) 
    audio_eco[:len(datos_audio)] = datos_audio  
    audio_eco[muestras_retardo:] += atenuacion * datos_audio  
    
    return audio_eco[:len(datos_audio)]


def aplicar_filtro_pasa_bajos(datos_audio, corte, frecuencia_muestreo):
    """Aplica un filtro pasa bajos al audio."""
    nyquist = 0.5 * frecuencia_muestreo  
    corte_normalizado = corte / nyquist  
    b, a = signal.butter(4, corte_normalizado, btype='low')  
    audio_filtrado = signal.filtfilt(b, a, datos_audio)
    return audio_filtrado

def aplicar_filtro_pasa_altas(datos_audio, corte, frecuencia_muestreo):
    """Aplica un filtro pasa altas al audio."""
    nyquist = 0.5 * frecuencia_muestreo  
    corte_normalizado = corte / nyquist  
    b, a = signal.butter(4, corte_normalizado, btype='high')  
    audio_filtrado = signal.filtfilt(b, a, datos_audio)
    return audio_filtrado

def aplicar_filtro_pasa_banda(datos_audio, baja, alta, frecuencia_muestreo):
    """Aplica un filtro pasa banda al audio."""
    nyquist = 0.5 * frecuencia_muestreo  
    corte_bajo = baja / nyquist  
    corte_alto = alta / nyquist  
    b, a = signal.butter(4, [corte_bajo, corte_alto], btype='band')  
    audio_filtrado = signal.filtfilt(b, a, datos_audio)
    return audio_filtrado

def aplicar_filtro_rechazo_banda(datos_audio, baja, alta, frecuencia_muestreo):
    """Aplica un filtro de rechazo de banda (Notch Filter) al audio."""
    nyquist = 0.5 * frecuencia_muestreo  
    corte_bajo = baja / nyquist  
    corte_alto = alta / nyquist  
    b, a = signal.butter(4, [corte_bajo, corte_alto], btype='bandstop')  
    audio_filtrado = signal.filtfilt(b, a, datos_audio)
    return audio_filtrado

def normalizar_audio(datos_audio):
    """Normaliza el audio para evitar distorsión."""
    valor_maximo = np.max(np.abs(datos_audio))
    if valor_maximo > 0:
        datos_audio = datos_audio / valor_maximo
    return datos_audio

if __name__ == "_main_":
     principal()