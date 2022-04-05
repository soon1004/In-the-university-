package servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import board.DBconnection;

/**
 * Servlet implementation class Process
 */
@WebServlet("/Process")
public class Process extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Process() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		
		String username = request.getParameter("username");
		String email = request.getParameter("email");
		String passwd = request.getParameter("passwd");
		
		String ordername = request.getParameter("name");
		String phone = request.getParameter("phone");
		String cafe = request.getParameter("cafe");
		String order = request.getParameter("order");
		
		DBconnection db = new DBconnection();
		
		if (request.getParameter("signup") != null)
		{
			if (db.Write(username, email, passwd))
			{
				System.out.println("Register succeeded");
			}
			
			else
			{
				request.setAttribute("error", "Failed to Sign up");
				
				request.getRequestDispatcher("index.jsp").forward(request, response);
			}
		}
		
		else if(request.getParameter("login") != null)
		{	
			if (db.Read(email, passwd))
			{
				System.out.println("Login succeeded");
				
				request.getSession().setAttribute("userid", db.getUserId());
				request.getSession().setAttribute("username", db.getUsername());

			}
			
			else
			{
				System.out.println("Login failed");
				
				request.setAttribute("error", "Failed to login");
			}
			
			request.getRequestDispatcher("index.jsp").forward(request, response);
		}
		
		else if(request.getParameter("orderbtn") != null)
		{
			if (db.Write(ordername, phone, cafe, order))
			{
				System.out.println("Order write succeeded");
				
				request.setAttribute("orderState", "Succeeded");
			}
			
			else
			{
				System.out.println("Order write failed");
				
				request.setAttribute("orderState", "Failed");
			}
			
			request.getRequestDispatcher("index.jsp").forward(request, response);
		}
		
		else
		{
			request.getSession().invalidate();
			
			System.out.println("Logout succeeded");
			
			response.sendRedirect("index.jsp");
		}
		
		db.CloseConnect();
	}

}
