"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SERVER_URL = "http://localhost:3131";

export default function PlayersManagement() {
  const [players, setPlayers] = useState([]);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    phone: "",
    position: "linha",
    skill: "1",
    wins: 0,
    games: 0,
    shirt: 0,
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchPlayers() {
      const res = await fetch(`${SERVER_URL}/players/list`);
      const data = await res.json();
      setPlayers(data.players || []);
    }
    fetchPlayers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "wins" || name === "shirt" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? "PATCH" : "POST";
    const url = isEditing
      ? `${SERVER_URL}/players/${formData.id}`
      : `${SERVER_URL}/players/create`;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setIsDialogOpen(false);
    setIsEditing(false);
    fetchPlayers();
  };

  const handleEdit = (player) => {
    setFormData(player);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${SERVER_URL}/players/${id}`, {
      method: "DELETE",
    });
    fetchPlayers();
  };

  async function fetchPlayers() {
    const res = await fetch(`${SERVER_URL}/players/list`);
    const data = await res.json();
    setPlayers(data.players || []);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Gerenciar Jogadores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  id: 0,
                  name: "",
                  phone: "",
                  position: "linha",
                  skill: "1",
                  wins: 0,
                  games: 0,
                  shirt: 0,
                  image: "",
                });
                setIsDialogOpen(true);
              }}>
              Adicionar Jogador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>
              {isEditing ? "Editar Jogador" : "Adicionar Jogador"}
            </DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Label>Nome</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Label>Telefone</Label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <Label>Posição</Label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                required>
                <option value="linha">Linha</option>
                <option value="goleiro">Goleiro</option>
              </select>
              <Label>Nível</Label>
              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                required>
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <Label>Vitórias</Label>
              <Input
                name="winsCount"
                type="number"
                value={formData.wins}
                onChange={handleChange}
                required
              />
              <Label>Número da Camisa</Label>
              <Input
                name="shirtNumber"
                type="number"
                value={formData.shirt}
                onChange={handleChange}
                required
              />
              <Label>Imagem</Label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />
              <Button type="submit">
                {isEditing ? "Atualizar" : "Salvar"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Posição</TableHead>
            <TableHead>Nível</TableHead>
            <TableHead>Vitórias</TableHead>
            <TableHead>Número</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={player.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.phone}</TableCell>
              <TableCell>{player.position}</TableCell>
              <TableCell>{player.skill}</TableCell>
              <TableCell>{player.wins}</TableCell>
              <TableCell>{player.shirt}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => handleEdit(player)}>
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(player.id)}>
                  Deletar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
