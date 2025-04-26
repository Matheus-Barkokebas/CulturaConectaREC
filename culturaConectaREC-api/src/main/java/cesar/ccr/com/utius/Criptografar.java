package cesar.ccr.com.utius;

import java.util.Scanner;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Criptografar {

	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

		System.out.print("Digite a senha para criptografar: ");
		String senha = scanner.nextLine();

		String senhaCriptografada = encoder.encode(senha);

		System.out.println("Senha criptografada: " + senhaCriptografada);
	}

}
